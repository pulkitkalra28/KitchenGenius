import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages';
import SigninPage from './pages/signin';
import Dashboard from './components/Dashboard';
import { CommonProvider } from './context/context';

function App() {

  return (
    <>
      <CommonProvider>
        <Router>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/signin' component={SigninPage} exact />
            {/* <Route path='/dashboard' component={Dashboard} /> */}
          </Switch>
        </Router>
      </CommonProvider>
    </>
  );
}

export default App;
