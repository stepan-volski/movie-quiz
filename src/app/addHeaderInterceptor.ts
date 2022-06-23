import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements HttpInterceptor {
  apiKey = '51416cc1-0329-407d-b9bd-133c06a23300';
  // apiKey = '31136b63-9165-4369-9d55-28fbda02e65f';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.append('X-API-KEY', this.apiKey),
    });
    return next.handle(clonedRequest);
  }
}
