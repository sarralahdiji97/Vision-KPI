import { Component, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from './shared/services/event-service/event-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Vision');
  constructor(
    private spinner: NgxSpinnerService,
    private eventService:EventService
  ){}

    ngOnInit(): void {
    this.eventService.isLoadingEvent.subscribe((isLoading) => {
      isLoading ? this.spinner.show() : this.spinner.hide();
    });
  }
}
