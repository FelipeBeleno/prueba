import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  arrStr: String[] = [];

  onScroll(){
    console.log('hola')
    for (let i = 0; i < 100; i++) {
      this.arrStr.push(i.toString())

  }
  }
  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
        this.arrStr.push(i.toString())

    }
  }
}
