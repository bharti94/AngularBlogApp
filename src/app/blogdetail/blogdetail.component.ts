import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit
{
  blogId:number;
  title:string;
  blogContent:string;
  authorName:string;

  //1,2,3,4(food,managment,health,technology)
  blogType:number=1;
  buttonTitlte:string="ADD TO FAVOURITES";
  buttonTitle2:string="REMOVE FROM FAVOURITES";
  isBlogAddedToFavs:boolean=false;


  constructor(private _route:ActivatedRoute,private _dataservice:DataService) { }

  ngOnInit()
  {
    //nested observables
    this._route.params.subscribe(params=>
    {
      this.blogId=+params['id'];
      //data base service call
      this._dataservice.getBlogById(this.blogId)
        .subscribe((blog)=>{
        this.title=blog.title;
        this.blogContent=blog.content;
        this.authorName=blog.author;
        var BType=blog.type.toLowerCase();
          console.log(BType);
          if(BType=="food")
          {
           this.blogType=1;
          }else if(BType=="management")
          {
           this.blogType=2;
          }else if(BType=="health")
          {
            this.blogType=3;
          }else
          {
            this.blogType=4;
          }


          var userObj=JSON.parse((sessionStorage.getItem('user')));
          if(userObj)
          {
            this._dataservice.getUserById(userObj.userid)
              .subscribe((data)=>{
                var result=data.favourites.includes(this.blogId);
                if(result)
                {
                  this.isBlogAddedToFavs=true;
                }else
                {
                  this.isBlogAddedToFavs=false;
                }
              })
          }
        })
    })
  }



  addToFavs()
  {
    var userObj=JSON.parse(sessionStorage.getItem('user'));
    if(userObj)
    {
      console.log(userObj);
      var userId=userObj.userid;
      console.log(userId);

      this._dataservice.getUserById(userId)
        .subscribe((data)=>{
        data.favourites.push(this.blogId);
        //second db hit
          this._dataservice.updateUserById(data)
            .subscribe((data2)=>{
            console.log(data2);
            alert("Blog added to favourites");
            this.isBlogAddedToFavs=true;
            })
        })
    }else
    {
      alert("You need to login to add to your favourites");
    }
  }

  removeFromFavs()
  {
    var userObj=JSON.parse(sessionStorage.getItem('user'));
    if(userObj)
    {
      var userId=userObj.userid;

      this._dataservice.getUserById(userId)
        .subscribe((data)=>{
        var index=data.favourites.indexOf(this.blogId);
        if(index>-1)
        {
          data.favourites.splice(index, 1);
          //second db hit
          this._dataservice.updateUserById(data)
            .subscribe((data2) => {
              console.log(data2);
              alert("Blog removed from favourites");
              this.isBlogAddedToFavs=false;
            })
        }
        })
    }else
    {
      alert("You need to login to add to your favourites");
    }
  }



}
