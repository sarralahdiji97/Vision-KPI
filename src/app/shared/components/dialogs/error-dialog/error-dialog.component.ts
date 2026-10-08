import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'pdca-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss'],
    standalone: false
})
export class ErrorModalDialogComponent  {

  public statusCode!: number;
  public message!: string;

  constructor(private dialogRef: MatDialogRef<ErrorModalDialogComponent>) { }

  public close(): void {
    this.dialogRef.close();
  }

}
