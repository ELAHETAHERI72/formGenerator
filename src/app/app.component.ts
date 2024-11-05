import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FormComponent } from "./form/form/form.component";
import { dateInterface, formConfig, formGroups, inputInterface, selectInterface, switchInterface, textAreaInterface, Types } from './form/models/interfaces/form-type.interface';
import { of, Subject } from 'rxjs';
import { BaseTableComponent } from "./base-table/base-table/base-table.component";

export interface formModel {
  name: string;
  cityName: string;
  fullName: string;
  isPay?:boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, BaseTableComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'formGenerator';
  tableConfig:any;

  ngOnInit(): void {

  }
}
