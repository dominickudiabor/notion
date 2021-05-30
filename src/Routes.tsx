import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { SocketConnection } from './components/socketClient'
import { Home } from './pages/Home'
import Product from './pages/Product'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/socket-test" component={SocketConnection} />
    <Route exact path="/products/:id" component={Product} />
  </Switch>
)

export default Routes
