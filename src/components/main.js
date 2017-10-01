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
            <Route exact path='/categrory/:category' component={Home}/>
            <Route exact path='/categrory/:category/:postId' component={PostDetail} />
            <Route exact path='/post/:postId' component={EditPost} />
        </Switch>
    </main>
)

export default Main