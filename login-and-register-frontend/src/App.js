import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Logics from "./logicsExample/Logics";
import CategoryCRUD from "./components/categories/Categories";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import CarCRUD from "./components/car-spareparts-crud/car-crud";

function App() {
  const [user, setLoginUser] = useState({});
  const isLoggedIn = user && user._id;
  return (
    <div className="App">
      {/* <Logics/> */}
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              <Homepage setLoginUser={setLoginUser} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          {isLoggedIn && (
            <Route path="/category-crud" component={CategoryCRUD}></Route>
          )}
          {isLoggedIn && (
            <Route path="/spareparts">
              <CarCRUD />
            </Route>
          )}

          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
