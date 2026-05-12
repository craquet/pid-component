import { Component, Input } from '@angular/core';
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
    <footer [class]="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; margin-top: 48px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <button mat-mini-fab [color]="darkMode ? 'accent' : 'primary'" disabled style="width: 40px; height: 40px;">
          <mat-icon [class.text-white]="darkMode" [class.text-gray-900]="!darkMode">storage</mat-icon>
        </button>
        <span style="font-size: 14px; font-weight: 600;">Lorem ipsum</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span [class]="darkMode ? 'text-gray-400' : 'text-gray-500'" style="font-size: 14px; white-space: nowrap;">Powered by</span>
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
  @Input() darkMode = false;
}
