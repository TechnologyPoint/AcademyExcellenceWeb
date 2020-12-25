import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import AppTheme from './layout/AppTheme';
import Paperbase from './layout/Paperbase';
import './App.css';

function App() {
  return (
    <AppTheme
          title="Paperbase theme - Material-UI"
          description={`A page that mimics Firebase.
            This item includes theming using the theme provider component.`}
        >
          <Paperbase />
          </AppTheme>

);
}

export default withAuthenticator(App);
