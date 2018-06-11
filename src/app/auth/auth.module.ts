import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ])
  ],
  providers: []
})
export class AuthModule { }
