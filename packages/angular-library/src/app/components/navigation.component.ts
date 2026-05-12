import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    PidComponent,
  ],
  template: `
    <mat-toolbar [class]="darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'" class="navigation-toolbar">
      <div class="nav-container">
        <div class="nav-brand">
          <button mat-mini-fab [color]="darkMode ? 'accent' : 'primary'" disabled>
            <mat-icon [class.text-white]="darkMode" [class.text-gray-900]="!darkMode">storage</mat-icon>
          </button>
          <span [class]="darkMode ? 'text-white' : 'text-gray-900'" class="brand-text">Lorem ipsum</span>
          <mat-chip [color]="darkMode ? 'warn' : 'warn'" class="{{ darkMode ? 'dark-chip' : '' }}">Demo</mat-chip>
        </div>

        <div class="nav-links">
          <button mat-button [color]="activePage === 'home' ? 'primary' : undefined" [class.text-white]="darkMode && activePage === 'home'" [class.text-gray-300]="darkMode && activePage !== 'home'" (click)="navigate.emit('home')">
            Home
          </button>
          <button mat-button [color]="activePage === 'datasets' ? 'primary' : undefined" [class.text-white]="darkMode && activePage === 'datasets'" [class.text-gray-300]="darkMode && activePage !== 'datasets'" (click)="navigate.emit('datasets')">
            Datasets
          </button>
          <button mat-button [color]="activePage === 'about' ? 'primary' : undefined" [class.text-white]="darkMode && activePage === 'about'" [class.text-gray-300]="darkMode && activePage !== 'about'" (click)="navigate.emit('about')">
            About
          </button>
          <mat-slide-toggle
            [checked]="darkMode"
            (change)="darkModeChange.emit($event.checked)"
            color="primary"
            class="theme-toggle"
          >
            <mat-icon>{{ darkMode ? 'dark_mode' : 'light_mode' }}</mat-icon>
          </mat-slide-toggle>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navigation-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-text {
      font-size: 18px;
      font-weight: 600;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-divider {
      margin: 0 16px;
    }

    .powered-by {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .powered-text {
      font-size: 14px;
    }

    .theme-toggle {
      margin-left: 16px;
    }

    ::ng-deep .dark-chip .mdc-chip__text {
      color: white !important;
    }
  `],
})
export class NavigationComponent {
  @Input() activePage = 'home';
  @Input() darkMode = false;
  @Output() navigate = new EventEmitter<string>();
  @Output() darkModeChange = new EventEmitter<boolean>();
}
