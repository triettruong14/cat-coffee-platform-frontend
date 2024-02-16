import React from 'react';
import { AppHeader } from './components/header/Header';
import { AppLayout } from './components/layout/Layout';
import { Home } from './pages';

function App() {
  return (
    <AppLayout header={<AppHeader />}>
      <Home />
    </AppLayout>
  );
}

export default App;
