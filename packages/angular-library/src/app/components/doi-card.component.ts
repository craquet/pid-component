import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-doi-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    PidComponent,
  ],
  template: `
    <mat-card [class]="darkMode ? 'bg-gray-800' : 'bg-white'" class="doi-card">
      <mat-card-content>
        <h3 [class]="darkMode ? 'text-gray-300' : 'text-gray-500'" class="label">Digital Object Identifier</h3>
        <div style="min-height: 120px; max-height: 300px; overflow: hidden;">
          <pid-component [value]="value" [openByDefault]="true" width="100%" />
        </div>
        @if (license) {
          <mat-divider></mat-divider>
          <h3 [class]="darkMode ? 'text-gray-300' : 'text-gray-500'" class="label" style="margin-top: 16px">License</h3>
          <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
            <pid-component [value]="license" width="100%" />
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .doi-card {
      padding: 24px;
      height: 100%;
      overflow: hidden;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
  `],
})
export class DoiCardComponent {
  @Input() value = '';
  @Input() license?: string;
  @Input() darkMode = false;
}
