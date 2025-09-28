import {Component, Input} from '@angular/core';
import {SectionTitleModel} from "../../classes/form.base-class";

@Component({
  selector: 'app-title-description',
  standalone: true,
  imports: [],
  templateUrl: './title-description.component.html',
  styleUrl: './title-description.component.scss'
})
export class TitleDescriptionComponent {
   @Input({required: true}) itemConfig!: SectionTitleModel;
}
