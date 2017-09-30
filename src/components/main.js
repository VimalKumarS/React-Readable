import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './homepage'
import NewPost from './NewPost'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/newpost' component={NewPost}/>
            <Route exact path='/:category' component={Home}/>
        </Switch>
    </main>
)

export default Main