// React
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import { Nav } from "./components/Nav";
import { Elements } from "./components/Elements";
import { Fetch } from "./components/Fetch";
import { Home } from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/elements" component={Elements} />
        <Route exact path="/fetch" component={Fetch} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
