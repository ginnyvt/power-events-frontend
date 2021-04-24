import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';

import Spinner from './components/Spinner/Spinner';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import ProtectedRoute from './auth0-config/protected-route';
import Profile from './components/Profile/Profile';
import CreateEvent from './components/Events/MyEvents/CreateEvent';
import EventDetail from './components/Events/SingleEvent/EventDetail';
import ListMyEvents from './components/Events/MyEvents/ListMyEvents';
import EditEvent from './components/Events/MyEvents/EditEvent';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Header />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/events/:eventId' component={EventDetail} />
        <ProtectedRoute path='/my-profile' component={Profile} />
        <ProtectedRoute path='/new-event' component={CreateEvent} />
        <ProtectedRoute path='/my-events' component={ListMyEvents} />
        <ProtectedRoute path='/edit/:eventId' component={EditEvent} />
      </Switch>

      <Footer />
    </>
  );
};

export default App;
