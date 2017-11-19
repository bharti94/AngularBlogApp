import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {DataShareService} from "../data-share.service";

interface IBlog
{
  id:number;
  type:string;
  title:string;
  author:string;
  authorId:number;
  content:string;
}

@Component({
  selector: 'app-userblog',
  templateUrl: './userblog.component.html',
  styleUrls: ['./userblog.component.css']
})
export class UserblogComponent implements OnInit
{
  //this id is of user/authorId(passed as parameter)
  id:number;
  myblogs:IBlog[];
  myfavs:any[];


  constructor( private _route:ActivatedRoute,private _dataservice:DataService,private _router:Router,private _datashare:DataShareService)
  {

  }


  ngOnInit()
  {
    this._route.params.subscribe(params =>{
      this.id=+params['id'];
    });

    this._dataservice.getBlogs()
      .subscribe((data)=>{
        this.myblogs=data.filter((blogObj)=>blogObj.authorId==this.id);
      })

  }


  deleteBlogWithId(id)
  {
    this._dataservice.deleteBlog(id)
      .subscribe((data)=>{
      this.myblogs=this.myblogs.filter((blog)=>blog.id!==id);
      })

  }
  updateBlogWithId(blogId)
  {
    var tempObj=this.myblogs.find((item)=>item.id===blogId);
    this._datashare.setObject(tempObj);
    this._router.navigate(['/userinput',0]);
  }
  addNewBlog()
  {
    this._router.navigate(['/userinput',this.id]);

  }


}
