import { Injectable } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ErrorModalDialogComponent } from '../../components/dialogs/error-dialog/error-dialog.component';
import { IErrorModalContent } from '../../models/client/IErrorModelContent';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
 
  private errorDialogRef!: MatDialogRef<ErrorModalDialogComponent, any>;
 
  constructor(public dialog: MatDialog) {}

  public openErrorDialog(
    content: IErrorModalContent,
    config: MatDialogConfig
  ): MatDialogRef<ErrorModalDialogComponent, any> {
    this.errorDialogRef = this.dialog.open(ErrorModalDialogComponent, config);
    this.errorDialogRef.componentInstance.statusCode = content.statusCode;
    this.errorDialogRef.componentInstance.message = content.message;
    return this.errorDialogRef;
  }
}
