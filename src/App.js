import * as React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import AppTheme from './layout/AppTheme';
import Paperbase from './layout/Paperbase';
import { Auth } from '@aws-amplify/auth';

import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState("");
  const [loggedInUserLoaded, setLoggedInUserLoaded] = React.useState(false);
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  React.useEffect(() => {
  (async () => {
      const user = await Auth.currentAuthenticatedUser();
      await sleep(1e3);
      if (user) {
        setLoggedInUserLoaded(true);
        setLoggedInUser(user.username);
      }
  })();
}, [loggedInUserLoaded]);

  return (
    <AppTheme
          title="Paperbase theme - Material-UI"
          description={`A page that mimics Firebase.
            This item includes theming using the theme provider component.`}
        >
          <Paperbase loggedInUser = {loggedInUser}/>
          </AppTheme>

);
}

export default withAuthenticator(App);
