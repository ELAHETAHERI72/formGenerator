import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { FormComponent } from "./form/form/form.component";


export interface formModel {
  name: string;
  cityName: string;
  fullName: string;
  isPay?:boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'formGenerator';
  tableConfig:any;

  ngOnInit(): void {

  }
}
