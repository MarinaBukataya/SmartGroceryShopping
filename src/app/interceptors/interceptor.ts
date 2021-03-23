import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizationService } from "../services/authorization.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
	public constructor(private authorizationService: AuthorizationService) { }
	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

		let token: string;
		token = this.authorizationService.getToken();

		if (token) {
			req = req.clone({
				setHeaders: {
					Authorization: token
				}
			});
		}
		return next.handle(req);
	}
}
