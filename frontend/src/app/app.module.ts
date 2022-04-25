import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppNgrxModule } from './app-ngrx.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersModule } from './features/users/users.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, AppNgrxModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
