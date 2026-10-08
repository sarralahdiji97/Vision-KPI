import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { EventService } from './event-service.service';

// <<-- Create a MatDialog mock class -->>
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

// describe('EventServiceService', () => {
//   let service: EventService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: MatDialog, useClass: MatDialogMock }
//       ]

//     });
//     service = TestBed.inject(EventService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
