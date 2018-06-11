import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { CodeGuard } from './auth/guards/code.guard';
import { TokenGuard } from './auth/guards/token.guard';
import { BaseUriInterceptor } from './auth/services/base-uri.interceptor';
import { TokenInterceptor } from './auth/services/auth.interceptor';
import { ErrorHandlerInterceptor } from './services/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', loadChildren: './auth/auth.module#AuthModule', canActivate: [CodeGuard, TokenGuard] },
      { path: 'search', loadChildren: './search/search.module#SearchModule' },
      { path: 'video', loadChildren: './video/video.module#VideoModule' },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUriInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
