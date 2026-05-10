import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PidComponent,
  ],
  template: `
    <footer style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background: #212121; margin-top: 48px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <button mat-mini-fab color="accent" disabled style="width: 40px; height: 40px;">
          <mat-icon>storage</mat-icon>
        </button>
        <span style="font-size: 14px; font-weight: 600; color: white;">ResearchDemo</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 14px; color: #9e9e9e; white-space: nowrap;">Powered by</span>
        <div style="flex: 1; min-width: 0;">
          <pid-component value="https://ror.org/04t3en479" [emphasizeComponent]="false" [hideSubcomponents]="true" />
        </div>
      </div>
    </footer>
  `,
  styles: [`:host {
    display: block;
  }`],
})
export class FooterComponent {
}
