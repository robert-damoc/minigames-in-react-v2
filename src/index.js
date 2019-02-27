import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss'

import TopMenu from './screens/TopMenu/'
import Home from './screens/Home'
import NotFound from './screens/NotFound'

const routing = (
  <Router>
    <div>
      <TopMenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'))
