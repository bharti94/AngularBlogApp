import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';

const BASE_BLOG_URL='http://localhost:3000/blogs';
const BASE_USER_URL='http://localhost:3000/users';
const BASE_CURRENTUSER_URL='http://localhost:3000/currentuser';

const header={headers:new Headers({'Content-Type':'application/json'})};

@Injectable()
export class DataService {

  constructor(private _http:Http)
  { }

  getUsers()
  {
    return this._http.get(BASE_USER_URL)
      .map(res=>res.json());
  }

  getBlogs()
  {
    return this._http.get(BASE_BLOG_URL)
      .map(res=>res.json());
  }
  deleteBlog(id)
  {
    return this._http.delete(BASE_BLOG_URL+'/'+id)
      .map(res=>res.json());
  }
  addBlog(blogObj)
  {
    return this._http.post(BASE_BLOG_URL,blogObj,header)
      .map(res=>res.json());
  }

  updateBlog(blogObj)
  {
    let blogId=blogObj.id;
    return this._http.patch(BASE_BLOG_URL+'/'+blogId,blogObj,header)
      .map(res=>res.json());
  }

  getBlogById(id)
  {
    return this._http.get(BASE_BLOG_URL+'/'+id)
      .map(res=>res.json());
  }
  getUserById(id)
  {
    return this._http.get(BASE_USER_URL+'/'+id)
      .map(res =>res.json());
  }
  updateUserById(userObj)
  {
    var id=userObj.id;
    return this._http.patch(BASE_USER_URL+'/'+id,userObj,header)
      .map(res=>res.json());
  }
  getCurrentUser()
  {
    var id=1;
    return this._http.get(BASE_CURRENTUSER_URL+'/'+id);
  }



}
