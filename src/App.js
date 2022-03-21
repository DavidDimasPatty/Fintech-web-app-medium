import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Login from "./components/login"
import AddUser from "./components/signup"
import Dashboard from "./components/dashboard"
import Home from "./components/home"
import CustomerList from "./components/customerList"
import Profile from "./components/profile"
import Onboard from "./components/onboard"
import "./components/app.css"

import { ReactSession } from 'react-client-session';
function App() {

  ReactSession.setStoreType("sessionStorage");
  return (
    <Router >
          <Switch>
           <Route exact path="/">
                <Login />
            </Route>
            <Route exact path="/signup">
              
                <AddUser />
            </Route>
            <Route exact path="/home">
            <div className="baris">
            <Dashboard />
                 <Home />
                 </div>
            </Route>
            <Route exact path="/customers">
                <div className="baris">
                <Dashboard />
                 <CustomerList />
                 </div>
            </Route>

            <Route exact path="/customers/:id">
                <body className="baris">
                <Dashboard />
                 <Profile />
                 </body>
            </Route>

            <Route exact path="/onboard">
                <body className="baris">
                <Dashboard />
                 <Onboard />
                 </body>
            </Route>
          
           </Switch>
      
    </Router>
  );
}

export default App;
