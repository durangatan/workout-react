import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Workout, Edit, Stats, Results } from '../screens';
export default function AppRoutes() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/workout" component={Workout} />
        <Route path="/edit" component={Edit} />
        <Route path="/stats" component={Stats} />
        <Route path="/results" component={Results} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Fragment>
  );
}
