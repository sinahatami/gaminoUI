export class JwtDecoder {
	public static GetExpirationDate(token: string): any {
		var header: any = token.split('.')[0];
		var payload: any = token.split('.')[1];
		var signature: any = token.split('.')[2];

		var payloadDecoded: any = JSON.parse(atob(payload));

		var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
		date.setUTCSeconds(payloadDecoded.exp);

		return (date);
	}

	public static GetDisplayName(token: string): any {
		var header: any = token.split('.')[0];
		var payload: any = token.split('.')[1];
		var signature: any = token.split('.')[2];
		var payloadDecoded: any = JSON.parse(atob(payload));

		return (payloadDecoded.DisplayName);
	}
}