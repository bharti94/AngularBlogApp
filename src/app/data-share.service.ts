import { Injectable } from '@angular/core';

interface IBlog
{
  id:number;
  type:string;
  title:string;
  author:string;
  authorId:number;
  content:string;
}

@Injectable()
export class DataShareService
{
  blogObj:IBlog;

  constructor() { }
  setObject(tempObj)
  {
    this.blogObj=tempObj;
  }
  getObject()
  {
    return this.blogObj;
  }

}
