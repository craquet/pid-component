import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    PidComponent,
  ],
  template: `
    <div class="mb-8">
      <h2 class="section-title">
        <mat-icon color="info">information</mat-icon>
        About ResearchDemo
        <mat-chip color="info" highlighted>Demo Application</mat-chip>
      </h2>
      <mat-card class="article-card">
        <p class="article-paragraph">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Click the "View License" button below to see how a
          license can be rendered. Demo showcases pid-component integration with Next.js App Router, demonstrating
          seamless display of persistent identifiers including DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g.
          0009-0005-2800-4833), ROR IDs (e.g. https://ror.org/04t3en479), Handle PIDs (e.g.
          21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6), and SPDX license references.
        </p>
        <p class="article-paragraph">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Portal uses
          <strong> pid-component</strong> to render various PID types with automatic detection
          and resolution from respective registries.
        </p>

        <mat-tab-group>
          <mat-tab label="DOIs">
            <div class="tab-content">
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="10.5281/zenodo.13629109" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="doi:10.5445/IR/1000178054" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="10.52825/ocp.v5i.1411" width="100%" />
              </div>
            </div>
          </mat-tab>
          <mat-tab label="ORCIDs">
            <div class="tab-content">
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="0009-0005-2800-4833" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="0000-0001-6575-1022" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="0009-0003-2196-9187" width="100%" />
              </div>
            </div>
          </mat-tab>
          <mat-tab label="Handles">
            <div class="tab-content">
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="20.1000/100" width="100%" />
              </div>
            </div>
          </mat-tab>
          <mat-tab label="RORs">
            <div class="tab-content">
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="https://ror.org/04t3en479" width="100%" />
              </div>
              <div style="min-height: 80px; max-height: 200px; overflow: hidden;">
                <pid-component value="https://spdx.org/licenses/MIT" width="100%" />
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
  `,
  styles: [`
    .mb-8 { margin-bottom: 32px; }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #212121;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .article-card { padding: 32px; }
    .article-paragraph {
      font-size: 14px;
      line-height: 1.8;
      color: #424242;
      margin-bottom: 16px;
    }
    .article-paragraph:last-child { margin-bottom: 0; }
    .tab-content { padding: 24px 0; display: flex; flex-direction: column; gap: 8px; }
  `],
})
export class AboutPageComponent {
}
