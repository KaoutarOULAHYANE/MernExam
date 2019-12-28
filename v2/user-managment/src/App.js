import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import UsersList from "./components/list-users.compnent"
import Mock from "./components/mock.component"
import EditUser from "./components/edit-user.component"

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      {/* with '/' Exercises List component will be loading */}
      {/* we specify a path for every component */}
      <Route path="/" exact component={UsersList} />
      <Route path="/addUsers"  component={Mock} />
      <Route path="/edituser/:id"  component={EditUser} />
      </div>
    </Router>
  );
}

export default App;