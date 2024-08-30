import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form/form.component";
import { formConfig, inputInterface, selectInterface, switchInterface, textAreaInterface, Types } from './form/models/interfaces/form-type.interface';
import { Subject } from 'rxjs';

export interface formModel {
  name:string;
  cityName:string;
  fullName:string;
  ispaid:boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  
  title = 'formGenerator';
  submited$:Subject<any> = new Subject();

  confog:formConfig = new formConfig({
    classList:'d-flex'+' '+'column-gap-2',
    
    submited:((v:formModel)=>{
       console.log(v,'vvvvvvvvvv');
       
    }),
      
    items: [
      new inputInterface({
        id:'name',
        inputType:Types.INPUT_TYPE,
        labelName:'نام',
        name:'name',
        placeholder:'name',
        bindItem:'name'
      }),
      new selectInterface({
        id:'city',
        inputType:Types.SELECT_TYPE,
        labelName:'شهر',
        name:'city',
        placeholder:'شهر',
        fileds:[
          {"name":"تبريز","id":1},
          {"name":"مراغه","id":2},
          {"name":"ميانه","id":3},
          {"name":"شبستر","id":4},
          {"name":"مرند","id":5},
          {"name":"جلفا","id":6},
          {"name":"سراب","id":7}
        ],
        bindItem:'cityName'
      }),
      new selectInterface({
        id:'fname',
        inputType:Types.SELECT_TYPE,
        labelName:'نام خانوادگی',
        name:'fname',
        placeholder:'fname',
        fileds:[{id:'zahra',name:'s',value:'s'}],
        bindItem:'fullName'
      }),
      new switchInterface({
        id:'ispaid',
        isSelect:false,
        placeholder:'قسطی',
        inputType:Types.SWITCH_TYPE,
        bindItem:'ispaid'
      })
    ],
    
    
  });

  ngOnInit(): void {
     this.submited$.subscribe(res=>{this.confog.submited?.(res)});
     
  }
}
