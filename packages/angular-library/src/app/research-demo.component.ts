import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AboutPageComponent,
  ArticleSectionComponent,
  Author,
  AuthorGridComponent,
  Dataset,
  DatasetsPageComponent,
  DatasetTableComponent,
  DoiCardComponent,
  FooterComponent,
  HeroCardComponent,
  LicenseDialogComponent,
  NavigationComponent,
} from './components';
import { initPidDetection, type PidDetectionController } from '@kit-data-manager/pid-component';

@Component({
  selector: 'app-research-demo',
  standalone: true,
  imports: [
    CommonModule,
    NavigationComponent,
    HeroCardComponent,
    DoiCardComponent,
    DatasetTableComponent,
    AuthorGridComponent,
    ArticleSectionComponent,
    LicenseDialogComponent,
    FooterComponent,
    DatasetsPageComponent,
    AboutPageComponent,
  ],
  template: `
    <div [class]="darkMode() ? 'bg-gray-900' : 'bg-gray-50'" class="research-demo-app">
      <app-navigation [activePage]="activePage()" [darkMode]="darkMode()" (navigate)="onNavigate($event)" (darkModeChange)="onDarkModeChange($event)" />

      <main class="main-content">
        <div class="container">
          @if (activePage() === 'home') {
            <div class="hero-grid">
              <div class="hero-main">
                <app-hero-card
                  title="This is an example webpage"
                  description="This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more."
                  [darkMode]="darkMode()"
                />
              </div>
              <div class="hero-doi">
                <app-doi-card
                  value="https://doi.org/10.5281/zenodo.13629109"
                  license="https://spdx.org/licenses/Apache-2.0"
                  [darkMode]="darkMode()"
                />
              </div>
            </div>

            <app-dataset-table [datasets]="datasets" [darkMode]="darkMode()" />

            <app-author-grid [authors]="authors" [darkMode]="darkMode()" />

            <div #articleSection>
              <app-article-section [standalone]="false" [darkMode]="darkMode()" />
            </div>
          }

          @if (activePage() === 'datasets') {
            <app-datasets-page />
          }

          @if (activePage() === 'about') {
            <app-about-page />
          }

          <app-license-dialog />
        </div>
      </main>

      <app-footer [darkMode]="darkMode()" />
    </div>
  `,
  styles: [`
    .research-demo-app {
      min-height: 100vh;
    }

    .main-content {
      padding: 32px 24px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
  `],
})
export class ResearchDemoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('articleSection') articleSection!: ElementRef<HTMLElement>;

  activePage = signal('home');
  darkMode = signal(false);
  isAutodiscoveryActive = signal(false);
  datasets: Dataset[] = [
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
  authors: Author[] = [
    { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
    { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
    { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
  ];
  private controller?: PidDetectionController;

  ngAfterViewInit() {
    if (this.articleSection?.nativeElement) {
      this.controller = initPidDetection({
        root: this.articleSection.nativeElement,
        darkMode: this.darkMode() ? 'dark' : 'light',
        emphasizeComponent: false,
      });
      this.isAutodiscoveryActive.set(true);
    }
  }

  ngOnDestroy() {
    if (this.controller) {
      this.controller.destroy();
      this.controller = undefined;
    }
  }

  onNavigate(page: string) {
    this.activePage.set(page);
  }

  onDarkModeChange(darkMode: boolean) {
    this.darkMode.set(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
