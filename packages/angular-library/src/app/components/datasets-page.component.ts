import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PidComponent } from '@kit-data-manager/angular-pid-component';

@Component({
  selector: 'app-datasets-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    PidComponent,
  ],
  template: `
    <div class="mb-8">
      <h2 class="section-title">
        <mat-icon color="primary">database</mat-icon>
        Lorem ipsum dolor sit amet
        <mat-chip [color]="isActive() ? 'accent' : 'warn'" highlighted>
          {{ isActive() ? 'Scanning Active' : 'Scanning Inactive' }}
        </mat-chip>
      </h2>
      <mat-card class="article-card">
        <table mat-table [dataSource]="datasets" class="w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let item">{{ item.id }}</td>
          </ng-container>
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let item">{{ item.title }}</td>
          </ng-container>
          <ng-container matColumnDef="doi">
            <th mat-header-cell *matHeaderCellDef>DOI</th>
            <td mat-cell *matCellDef="let item">
              <pid-component [value]="item.doi" [openByDefault]="false" />
            </td>
          </ng-container>
          <ng-container matColumnDef="license">
            <th mat-header-cell *matHeaderCellDef>License</th>
            <td mat-cell *matCellDef="let item">
              <pid-component [value]="item.license" [openByDefault]="false" />
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
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
    .w-full { width: 100%; }
  `],
})
export class DatasetsPageComponent {
  isActive = signal(false);
  displayedColumns = ['id', 'title', 'doi', 'license'];

  datasets = [
    {
      id: '1',
      title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
      doi: 'doi:10.5445/IR/1000178054',
      license: 'https://spdx.org/licenses/MIT',
    },
    {
      id: '2',
      title: 'Sed do eiusmod tempor incididunt ut labore et dolore',
      doi: '10.52825/ocp.v5i.1411',
      license: 'CC-BY4.0',
    },
    {
      id: '3',
      title: 'Ut enim ad minim veniam quis nostrud exercitation',
      doi: 'https://doi.org/10.5281/zenodo.13629109',
      license: 'Apache-2.0',
    },
    {
      id: '4',
      title: 'An example Handle FDO with some nice contents',
      doi: '21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6',
      license: 'CC-BY4.0',
    },
    {
      id: '5',
      title: 'An example of a very large record',
      doi: '21.T11981/5760c10e-6e64-41ea-824e-8dd4d3d2145d',
      license: 'CC-BY4.0',
    },
  ];
}
