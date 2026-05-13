import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-license-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    PidComponent,
  ],
  template: `
    <mat-card class="license-card" [class]="darkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="card-title" [class]="darkMode ? 'text-white' : 'text-gray-900'">
        <mat-icon [class]="darkMode ? 'text-white' : ''">scale</mat-icon>
        License Information
      </h2>
      <button mat-flat-button color="primary" (click)="openDialog()">
        <mat-icon>scale</mat-icon>
        View License Details
      </button>
    </mat-card>
  `,
  styles: [`
    .license-card {
      padding: 24px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `],
})
export class LicenseDialogComponent {
  @Input() darkMode = false;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LicenseDialogContentComponent, {
      width: '600px',
      data: { darkMode: this.darkMode },
    });
  }
}

@Component({
  selector: 'app-license-dialog-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, PidComponent],
  template: `
    <h2 mat-dialog-title [class]="data.darkMode ? 'text-white' : ''">Apache License 2.0</h2>
    <mat-dialog-content>
      <p [class]="data.darkMode ? 'text-gray-300' : 'text-gray-700'" style="line-height: 1.8; margin-bottom: 16px;">
        This dataset is published under the Apache 2.0 license, allowing free reuse with appropriate attribution.
      </p>
      <div style="min-height: 150px; max-height: 400px; overflow: hidden;">
        <pid-component value="https://spdx.org/licenses/Apache-2.0" [darkMode]="data.darkMode ? 'dark' : 'light'" width="100%" />
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()" [class]="data.darkMode ? 'text-white' : ''">Close</button>
    </mat-dialog-actions>
  `,
})
export class LicenseDialogContentComponent {
  constructor(
    public dialogRef: MatDialogRef<LicenseDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { darkMode: boolean },
  ) {
  }

  close() {
    this.dialogRef.close();
  }
}
