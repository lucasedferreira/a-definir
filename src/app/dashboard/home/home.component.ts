import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DasboardHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('aaa');
  }

}