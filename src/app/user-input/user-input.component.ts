import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataShareService} from "../data-share.service";
import {DataService} from "../data.service";

interface IBlog {
  //this is blog id
  id: number;
  type: string;
  title: string;
  author: string;
  authorId: number;
  content: string;
}

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  blogObj: IBlog = {

    type:"",
    content:"",
    id:0,
    authorId:0,
    author:"",
    title:"",
  };

  //flag=0 =>this component rendered from an update blog process routing
  //flag=(any other id) =>this component rendered from an add blog process routing with user id
  //this data is sent in the parameter during routing(to UserInputComponent)
  flag: number;
  title: string = "";
  type: string = "Technology";
  content: string = "";
  name: string;

  constructor(private _rtr: Router, private _route: ActivatedRoute, private _dataShare: DataShareService, private _router: DataService)
  {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.flag = +params['id'];
    });

    if (this.flag === 0) {
      //update
      this.blogObj = this._dataShare.getObject();
      console.log(this.blogObj);

      this.title = this.blogObj.title;
      this.type = this.blogObj.type;
      this.content = this.blogObj.content;
    }
  }

  //common method for add and update both
  submitBlog() {
    if (this.flag !== 0)
    {
      //add
      this._router.getUserById(this.flag)
        .subscribe((data) => {
          this.name = data.username;

          this.blogObj.type = this.type;
          this.blogObj.title = this.title;
          this.blogObj.content = this.content;
          this.blogObj.author = this.name;
          this.blogObj.authorId = this.flag;
          this._router.addBlog(this.blogObj)
            .subscribe((data) => {
              console.log(data);
              this._rtr.navigate(['/userblog', this.blogObj.authorId]);
            })
        });
    } else {
      //update
      this.blogObj.title = this.title;
      this.blogObj.type = this.type;
      this.blogObj.content = this.content;
      //rest properties already set in our object
      this._router.updateBlog(this.blogObj)
        .subscribe((data) => {
          console.log(data);
          this._rtr.navigate(['/userblog', this.blogObj.authorId]);
        });
    }
    //redirect to userblog
    alert("Blog submitted!!");

  }
}
