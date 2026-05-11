'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Container, Grid, Stack } from '@mantine/core';
import {
  AboutPage,
  ArticleSection,
  AuthorGrid,
  DatasetsPage,
  DatasetTable,
  DoiCard,
  Footer,
  HeroCard,
  LicenseDialog,
  Navigation,
} from './components';
import { initPidDetection, type PidDetectionController } from '@kit-data-manager/pid-component';

interface AutodiscoveryContextValue {
  controller: PidDetectionController | null;
  isActive: boolean;
}

const AutodiscoveryContext = createContext<AutodiscoveryContextValue>({
  controller: null,
  isActive: false,
});

export function useAutodiscovery() {
  return useContext(AutodiscoveryContext);
}

const datasets = [
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

const authors = [
  { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
];

interface AppProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export function ResearchDemoApp({ activePage = 'home', onNavigate }: AppProps) {
  const [currentPage, setCurrentPage] = useState(activePage);
  const [isActive, setIsActive] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PidDetectionController | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    onNavigate?.(page);
  };

  useEffect(() => {
    if (articleRef.current && !controllerRef.current) {
      controllerRef.current = initPidDetection({
        root: articleRef.current,
        darkMode: 'light',
      });
      setIsActive(true);
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
        setIsActive(false);
      }
    };
  }, []);

  return (
    <AutodiscoveryContext.Provider value={{ controller: controllerRef.current, isActive }}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Navigation activePage={currentPage} onNavigate={handleNavigate} />

        <Container size="xl" py="xl">
          {currentPage === 'home' && (
            <Stack gap="xl">
              <Grid gutter="lg">
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <HeroCard
                    title="This is an example webpage"
                    description="This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more."
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <DoiCard
                    value="https://doi.org/10.5281/zenodo.13629109"
                    license="https://spdx.org/licenses/Apache-2.0"
                  />
                </Grid.Col>
              </Grid>

              <DatasetTable datasets={datasets} />

              <AuthorGrid authors={authors} />

              <div ref={articleRef}>
                <ArticleSection />
              </div>
            </Stack>
          )}

          {currentPage === 'datasets' && <DatasetsPage />}
          {currentPage === 'about' && <AboutPage />}

          <LicenseDialog />
        </Container>

        <Footer />
      </div>
    </AutodiscoveryContext.Provider>
  );
}
