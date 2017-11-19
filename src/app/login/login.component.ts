import {Component,OnInit, Output} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";

interface Iuser
{
  id:number;
  username:string;
  password:string;
  favourites:number[];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{
  buttonTitle:string="SUBMIT";
  userName:string;
  password:string;
  users:Iuser[];

  constructor(private _request:DataService,private _router:Router) { }

  ngOnInit()
  {
    this._request.getUsers()
      .subscribe((data)=>{
      this.users=data;
      })
  }
  verifyUserOnClick(uname,pword)
  {
    //username=username.toLowerCase();
    var result:boolean=false;

    let obj = this.users.find(obj => obj.username ===uname&&obj.password===pword);
    if(!obj)
    {
      result=false;
    }else
    {
      result=true;
    }
    if(result)
    {
      // goto bloguser component with user id and set session storage
      var userObj={
        userid:obj.id,
        username:obj.username
      };
      sessionStorage.setItem('user',JSON.stringify(userObj));

      this._router.navigate(['/userblog',obj.id]);
    }else
    {
      //try again login
      alert("Login failed..Try again!!");
    }

  }

}
