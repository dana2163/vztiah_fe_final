import {Component, Input} from '@angular/core';
import {IGrade} from "../../models/grade";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent {
  @Input() grade : IGrade
}
