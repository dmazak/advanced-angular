import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppAuthModule } from './app-auth.module';
import { AppNgrxModule } from './app-ngrx.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { TodosModule } from './features/todos/todos.module';
import { UsersModule } from './features/users/users.module';
import { IdentityModule } from './libs/auth/identity.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppNgrxModule,
    UsersModule,
    AppAuthModule,
    IdentityModule,
    TodosModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
