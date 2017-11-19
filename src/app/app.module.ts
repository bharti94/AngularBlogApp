import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {DataService} from "./data.service";
import { BlogcardComponent } from './blogcard/blogcard.component';
import { BlogdetailComponent } from './blogdetail/blogdetail.component';
import {HttpModule} from "@angular/http";
import {Router, RouterModule} from "@angular/router";
import { AboutComponent } from './about/about.component';
import {FormsModule} from "@angular/forms";
import { UserblogComponent } from './userblog/userblog.component';
import { UserInputComponent } from './user-input/user-input.component';
import {DataShareService} from "./data-share.service";
import { FavouritesComponent } from './favourites/favourites.component';

const approutes=[
  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"login",component:LoginComponent},
  {path:"userblog/:id",component:UserblogComponent},
  {path:"userinput/:id",component:UserInputComponent},
  {path:"blogdetail/:id",component:BlogdetailComponent},
  {path:"favourites",component:FavouritesComponent},
  {path:"**",component:HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BlogcardComponent,
    BlogdetailComponent,
    AboutComponent,
    UserblogComponent,
    UserInputComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [DataService,DataShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
