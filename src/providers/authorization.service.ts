import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtDecoder } from './jwt.decoder';
//import { environment } from 'environments/environment';

@Injectable()
export class AuthorizationGuardService implements CanActivate {
	constructor(private _router: Router, private _httpClient: HttpClient) {
	}

	canActivate(): boolean {
		var isAuthenticated: boolean = false;
		var token: string = "";
		var isLocalStorage: boolean = false;

		if (localStorage.getItem("Token") !== null) {
			isAuthenticated = true;
			token = localStorage.getItem("Token");
			isLocalStorage = true;
		} else if (sessionStorage.getItem("Token") !== null) {
			isAuthenticated = true;
			token = sessionStorage.getItem("Token");
			isLocalStorage = false;
		}

		if (isAuthenticated == false) {
			this._router.navigate(['login']);
			return false;
		}

		if (isAuthenticated) {
			//Check ExpireTime for refreshToken

			var expirationDate = JwtDecoder.GetExpirationDate(token);
			var dateTime: any = new Date();
			var expireMinutes = (expirationDate - dateTime) / 60000;
			if (expireMinutes < 30) {
				// می باشد RefreshToken تمامی بررسی ها انجام و زمان فراخوانی 
				// به دلیل چک شدن تمامی موارد در طرف سرور ، نگرانی از بابت دستکاری زمان سیستم وجود ندارد
				this._httpClient.post<any>('env' + "/token/refreshtoken", {
					token: token
				}).subscribe(data => {
					if (data.Valid) {
						if (isLocalStorage) {
							localStorage.Token = data.Token;
							localStorage.FullName = data.FullName;
							localStorage.Photo = data.Photo;
							//localStorage.UserId = data.UserId;
							//localStorage.RoleId = data.RoleId;
						} else {
							sessionStorage.Token = data.Token;
							sessionStorage.FullName = data.FullName;
							sessionStorage.Photo = data.Photo;
							//sessionStorage.UserId = data.UserId;
							//sessionStorage.RoleId = data.RoleId;
						}
					} else {
						localStorage.removeItem("Token");
						sessionStorage.removeItem("Token");

						localStorage.removeItem("FullName");
						sessionStorage.removeItem("FullName");

						localStorage.removeItem("Photo");
						sessionStorage.removeItem("Photo");

						//localStorage.removeItem("UserId");
						//sessionStorage.removeItem("UserId");

						//localStorage.removeItem("RoleId");
						//sessionStorage.removeItem("RoleId");

						this._router.navigate(['login']);
					}
				});
			}
		}

		return true;
	}
}