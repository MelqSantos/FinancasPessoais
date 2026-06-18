import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    const token = environment.token || localStorage.getItem('financas.token') || '';
    const authReq = token && !req.headers.has('Authorization')
      ? req.clone({
          setHeaders: {
            Authorization: token
          }
        })
      : req;

    return next.handle(authReq).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false)
        }
      )
    );
  }
}
