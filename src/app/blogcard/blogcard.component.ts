import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blogcard',
  templateUrl: './blogcard.component.html',
  styleUrls: ['./blogcard.component.css']
})
export class BlogcardComponent implements OnInit
{
  @Input() title:string;
  @Input() blogId:number;
  buttonTitle:string="READ FULL";

  constructor() { }

  ngOnInit() {
  }

}
