import React from 'react';
import { AppHeader } from './components/Header';
import { AppLayout } from './components/Layout';
import { Home } from './pages';

function App() {
  return (
    <AppLayout header={<AppHeader />}>
      <Home />
    </AppLayout>
  );
}

export default App;
