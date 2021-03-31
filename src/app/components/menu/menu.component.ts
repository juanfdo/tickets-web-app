import { Component, OnInit } from '@angular/core';
import { faTicketAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faTicketAlt = faTicketAlt;
  faUser = faUser;
  constructor() { }

  ngOnInit(): void {
  }

}
