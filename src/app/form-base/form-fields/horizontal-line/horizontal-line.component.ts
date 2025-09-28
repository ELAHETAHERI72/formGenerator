import {Component, Input} from '@angular/core';
import {LineInterface} from "../../classes/form.base-class";

@Component({
  selector: 'app-horizontal-line',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-line.component.html',
  styleUrl: './horizontal-line.component.scss'
})
export class HorizontalLineComponent {

  @Input({required: true}) itemConfig!: LineInterface;
}
