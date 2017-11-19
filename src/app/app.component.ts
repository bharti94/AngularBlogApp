import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  navTitle1:string="HOME";
  navTitle2:string="ABOUT";

  navTitle3:string="LOGIN";
  navTitle4:string='LOGOUT';
  navTitle5:string="FAVOURITES";

  constructor(private _router:Router)
  {


  }
  logout()
  {
    sessionStorage.removeItem('user');
    this._router.navigate(['/home']);
  }
  isTheUserLoggedIn()
  {
    var obj=sessionStorage.getItem('user');
    if(!obj)
    {
      return false;
    }else
    {
      return true;
    }


  }



}
