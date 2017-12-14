import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { AlertModule } from 'ngx-bootstrap';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './header/header.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/services/auth.service';
import { NotificationService } from './services/notification.service';
import { AuthenticationInterceptor } from './auth/services/auth.Interceptor';
import { CanActivateUserService } from './auth/services/can-activate-user.service';
import { appStoreProviders } from './redux/redux.config';

export function loadApp(authService) {
  return function() {
    return authService.loadUser();
  };
}

export class CustomOption extends ToastOptions {
  animate = 'flyRight';
  toastLife = 1500;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AuthModule,
    DashboardModule,
    HeaderModule,
    AppRoutingModule,
  ],
  providers: [
    appStoreProviders, AuthService,
    NotificationService,
    {
      provide: ToastOptions,
      useClass: CustomOption
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }, CanActivateUserService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadApp,
      deps: [AuthService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
