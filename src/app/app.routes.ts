import {Routes} from '@angular/router';
import {TestFormComponent} from "./test-form/test-form.component";
import {Test2Component} from "./test2/test2.component";
import {BASE_API_RELATIVE_PATH} from "./form-base/base-d-i.service";

export const routes: Routes = [
  {path: 'test', component: TestFormComponent,
    providers:[
      {provide: BASE_API_RELATIVE_PATH,useValue: '/test'},
    ]
  },
  {path: 'test2', component: Test2Component},
  {path: '', redirectTo: 'test', pathMatch: 'full'},
];
