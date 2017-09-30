import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './stores/configureStore'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRender from './components/App'

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
       <AppRender />
      </BrowserRouter>
    </Provider>
  )
}

export default App;
