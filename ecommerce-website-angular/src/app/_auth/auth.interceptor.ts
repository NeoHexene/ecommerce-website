import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EcommerceUserAuthService } from '../_services/ecommerce-user-auth-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
    const authService = inject(EcommerceUserAuthService);
    const router = inject(Router);

    if (req.headers.get("No-Auth") === "True") {
        return next(req.clone());
    }

    const token = authService.getToken();
    const modifiedReq = token ? addToken(req, token) : req;

    return next(modifiedReq).pipe(
        catchError((err) => {
            console.error("Error: ", err);
            if (err.status === 401) {
                authService.clear();
                router.navigate(['/login']);
            } else if (err.status === 403) {
                router.navigate(['/forbidden']);
            }
            return throwError(() => err);
        })
    );
};

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}