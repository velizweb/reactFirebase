import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Tasklist from "./task/TaskList";
import Login from "./login";
import Logout from "./logout";
import firebase from "./config/fbConfig";
const { Content } = Layout;

const App = () => {
  const [loggued, setLogguet] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(auth => {
      if (auth !== null) setLogguet(true);
    });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Layout className="wrapper">
          {!loggued ? (
              <Login />
            ) : (
              <Layout>
                <Content className="wrapper__body">
                  <div className="wrapper__content">
                    <Route path="/" component={Tasklist} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/logout" render={() => <Logout firebase={firebase} />} exact />
                  </div>
                </Content>
              </Layout>
            )
          }
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
