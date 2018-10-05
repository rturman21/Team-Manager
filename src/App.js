import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Teams from './components/Teams/Teams';
import AddTeam from './components/Teams/AddTeam';
import EditTeam from './components/Teams/EditTeam';
import Header from './components/Layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import {Provider} from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header title="Team Logger"/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Teams}/>
                <Route exact path="/team/add" component={AddTeam}/>
                <Route exact path="/team/edit/:id" component={EditTeam}/>
                <Route exact path="/About" component={About}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
