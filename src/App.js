import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/sandstone/bootstrap.min.css';

import Spinner from './components/Spinner/Spinner';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import ProtectedRoute from './auth0-config/protected-route';
import Profile from './components/Profile/Profile';
import CreateEvent from './components/Events/CreateEvent';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute path='/my-profile' component={Profile} />
          <ProtectedRoute path='/new-event' component={CreateEvent} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
