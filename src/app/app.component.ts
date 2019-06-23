import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clicktale';
  term: string;
  updateList(event) {
    this.term = event;
    console.log(' updateList app.comp = ' + event);
  }
}
