import React, { useContext } from 'react';

import { ClientList } from './clients/ClientList';
import { DataLoader } from './components/data-loader/DataLoader';
import { HttpClientContext } from './http-service/HttpClientContext';
import { Client } from './clients/client-model';
import { Page, PageSection } from '@patternfly/react-core';
import { Header } from './PageHeader';
import { PageNav } from './PageNav';
import { KeycloakContext } from './auth/KeycloakContext';

export const App = () => {
  const httpClient = useContext(HttpClientContext);
  const keycloak = useContext(KeycloakContext);

  const loader = async () => {
    return await httpClient
      ?.doGet('/realms/master/clients?first=0&max=20&search=true')
      .then((r) => r.data as Client[]);
  };
  return (
    <Page header={<Header />} isManagedSidebar sidebar={<PageNav />}>
      <PageSection variant="light">
        <DataLoader loader={loader}>
          {(clients) => (
            <ClientList
              clients={clients}
              baseUrl={keycloak!.authServerUrl()!}
            />
          )}
        </DataLoader>
      </PageSection>
    </Page>
  );
};
