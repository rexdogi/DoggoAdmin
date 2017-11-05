import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Content from "components/content/index";
import Scraping from "components/scraping/index";
import MyDrawer from "components/drawer/index";
import Categories from 'components/categories/index';
import Pages from 'components/pages/index';
import {Typography} from "material-ui";
import history from './history'

const styles = {

    wrapper: {

    }
}

class App extends Component {
    render() {
        const Home = () => (
            <Typography type="display1" noWrap>
                Home
            </Typography>
        );
        return (
                <Router>
                    <MyDrawer>
                        <div style={styles.wrapper}>
                            <Route
                                path='/'
                                exact={true}
                                component={Home}
                            />
                            <Route
                                path='/content'
                                exact={true}
                                component={Content}
                            />
                            <Route
                                path='/scraping'
                                exact={true}
                                component={Scraping}
                            />
                            <Route
                                path='/categories'
                                exact={true}
                                component={Categories}
                            />

                            <Route
                                path='/pages'
                                exact={true}
                                component={Pages}
                            />
                        </div>
                    </MyDrawer>
                </Router>
        );
    }
}

export default App;
