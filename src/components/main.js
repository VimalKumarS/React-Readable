import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './homepage'
import NewPost from './NewPost'
import PostDetail from './PostDetail'
import EditPost from './EditPost'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/newpost' component={NewPost}/>
            <Route exact path='/post/:postId' component={EditPost} />
            <Route exact path='/:category' component={Home}/>
            <Route exact path='/:category/:postId' component={PostDetail} />
            
        </Switch>
    </main>
)

export default Main