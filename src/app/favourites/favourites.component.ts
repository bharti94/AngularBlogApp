import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";

interface IUser
{
  id:number,
  username:string,
  password:string,
  favourites:number[]
}
interface IBlogData
{
  blogid:number;
  blogtitle:string;
}

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit
{
  userId:number=-1;

  userObject:IUser= {
    id:-1,
    username:"",
    password:"",
    favourites:[]
  };
  blogObjects:IBlogData[]=[];


  constructor(private _dataservice:DataService,private _router:Router) { }

  ngOnInit()
  {
    var userObj=JSON.parse(sessionStorage.getItem('user'));
    if(!userObj)
    {
      alert("Please login first");
      this._router.navigate(['/home']);
    }else
    {
      this.userId=userObj.userid;

      //nested service observables
      this._dataservice.getUserById(this.userId)
        .subscribe((data)=>{
        this.userObject=data;
        console.log(this.userObject);

        this._dataservice.getBlogs()
          .subscribe((data2)=>{
          for(var i=0;i<this.userObject.favourites.length;i++)
          {
            var tempBLOGobj=data2.find(o=>o.id===this.userObject.favourites[i]);
            if(tempBLOGobj)
            {
              var temp:IBlogData ={blogid:tempBLOGobj.id,
              blogtitle:tempBLOGobj.title};
              this.blogObjects.push(temp);
            }
          }
          console.log(this.blogObjects);
          })
        })

    }

  }

}
