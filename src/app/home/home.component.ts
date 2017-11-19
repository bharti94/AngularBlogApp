import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

interface IBlog
{
  id:number,
  type:string,
  title:string,
  author:string,
  authorId:number,
  content:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  allBlogs:IBlog[];
  blogs:IBlog[];
  filterBy:string=" ";
  isFilterOn:boolean=false;
  titleFilter:string="";


  constructor(private _dataservice:DataService)
  { }

  ngOnInit()
  {
    this._dataservice.getBlogs()
      .subscribe((data)=>{
      this.allBlogs=data;
      this.blogs=data;
    })
  }
  filter(filterby)
  {
    if(filterby===""||filterby===" ")
    {
      alert("Please choose a type");
    }else
    {
      this.blogs=this.allBlogs.filter((obj)=>obj.type===filterby);
      this.isFilterOn=true;
    }
  }
  removeFilter()
  {
    this.blogs=this.allBlogs;
    this.filterBy=" ";
    this.isFilterOn=false;
  }
  performFilter(filterString:string)
  {
    console.log(filterString);
    filterString=filterString.toLowerCase();
    if(filterString==""||filterString.trim()==" ")
    {
      this.blogs=this.allBlogs;
    }else
      {
      this.blogs=this.allBlogs.filter((blog :IBlog)=>blog.title.toLowerCase().indexOf(filterString)!=-1);
    }
  }


}
