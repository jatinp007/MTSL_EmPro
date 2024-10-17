import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor req',req);
    
    return next.handle(req).pipe(
      tap(
        (event) => {
          console.log('event interceptor req',req);
          if (event instanceof HttpResponse) {
            console.log('event interceptor req',req);
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Request successful!', 
              life: 5000 // Set life for this toast
            });
          }
        },
        (error) => {
          console.log('error interceptor req',req);
          console.log('error interceptor error',error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Request failed!', 
            life: 5000 // Set life for this toast
          });
        }
      )
    );
  }
}