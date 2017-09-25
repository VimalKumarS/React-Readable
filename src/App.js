import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './stores/configureStore'
import 

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/:category' component={Homepage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
