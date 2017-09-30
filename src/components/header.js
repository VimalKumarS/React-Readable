import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from '../actions/categories';

class Header extends React.Component {

    componentWillMount() {
        //console.log(this.props)
        //console.log()
        this.props.loadCategory();
    }

    render() {
        const categories = this.props.categories;
        
        return (
            <header>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">Readable</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {categories.length > 0 ?  categories.map((item) => (
                                    
                                    <li key={item.path}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </li>
                                )): 'None'}
                            </ul>
                        </div>
                    </div>

                </nav>
            </header>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        categories : state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCategory: () => dispatch(actions.loadCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
