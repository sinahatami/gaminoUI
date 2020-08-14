import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtDecoder } from './jwt.decoder';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
	loaderCount = 0

	constructor(private toastrService: ToastrService, private _router: Router, private loaderService: NgxSpinnerService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loaderService.show("spinner");
		this.loaderCount++

		var token: any = null;
		if (localStorage.getItem("Token") !== null) {
			token = localStorage.Token;
		} else if (sessionStorage.getItem("Token") !== null) {
			token = sessionStorage.Token;
		}

		var pathname: string = window.location.pathname;

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: token
				}
			});
		}

		request = request.clone({
			setHeaders: {
				'Content-Encoding': 'gzip'
			}
		})

		return next.handle(request).pipe(
			finalize(() => {
				this.loaderCount--;
				if (this.loaderCount <= 0) {
					this.loaderCount = 0;
					this.loaderService.hide("spinner");
				}
			})
		)
	}

	static LastMessageShown: number = null;
	private handleError(err: HttpErrorResponse): Observable<any> {
		if ((err.status === 401 || err.status === 306 || err.status === 0) && err.url.substr(22) != "api/Report/Roles/Alarms/Fix") {
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
				return Observable.throw(err);
			}

			if (isAuthenticated) {
				//Check ExpireTime for refreshToken

				var expirationDate = JwtDecoder.GetExpirationDate(token);
				var dateTime: any = new Date();
				var expireMinutes = (expirationDate - dateTime) / 60000;
				if (expireMinutes < 0) {
					this._router.navigate(['login']);
					return Observable.throw(err);
				}
			}

			if (CustomHttpInterceptor.LastMessageShown == null || Date.now() - CustomHttpInterceptor.LastMessageShown > 1500) {
				switch (err.status) {
					case 306:
						this.toastrService.error("خطای ارتباط با کامپیوتر مرکزی(بانک اطلاعاتی)", "خطا");
						break;
					case 401:
						this.toastrService.error("متاسفانه شما به این قسمت از برنامه دسترسی ندارید", "خطا");
						break;
					case 0:
						this.toastrService.error("خطای ارتباط با کامپیوتر مرکزی(هسته اصلی)", "خطا");
						break;
				}

				CustomHttpInterceptor.LastMessageShown = Date.now();
			}
		}
		return Observable.throw(err);
	}
}