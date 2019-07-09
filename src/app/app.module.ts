import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FormComponent } from "./components/form/form.component";
import { AdsComponent } from "./components/ads/ads.component";
import { AdsService } from "./services/ads.service";
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, FormComponent, AdsComponent, LoginComponent, HeaderComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [AdsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
