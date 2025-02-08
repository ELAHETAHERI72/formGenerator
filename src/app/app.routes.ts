import {Routes} from '@angular/router';
import {TestFormComponent} from "./test-form/test-form.component";
import {Test2Component} from "./test2/test2.component";

export const routes: Routes = [
  {path: 'test', component: TestFormComponent},
  {path: 'test2', component: Test2Component},
  {path: '', redirectTo: 'test', pathMatch: 'full'},
];
