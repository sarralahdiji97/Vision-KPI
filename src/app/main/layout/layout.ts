import { Component } from '@angular/core';
import { version } from '../../shared/enums/general.enum';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  public version : string = version;
}
