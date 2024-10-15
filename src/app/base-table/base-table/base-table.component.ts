import { Component, effect, Input, signal, WritableSignal, ɵunwrapWritableSignal } from '@angular/core';
import { BaseTableInterface } from '../types';

@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss'
})
export class BaseTableComponent {

   _tableConfig:WritableSignal<BaseTableInterface> =  signal<BaseTableInterface>({} as BaseTableInterface);
    table:BaseTableInterface={};
 
  @Input() set tableConfig(config:BaseTableInterface) {
      this._tableConfig.set(config);
  }


  constructor() {
    effect(() => {
       this.table = this._tableConfig();
       console.log(this.table);
       
    });
  }


  createTableRows(){
    // this._tableConfig.
  }

}
