// React
import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import { Nav } from "./components/Nav";
import { Elements } from "./components/Elements";
import { Hooks } from "./components/Hooks";
import { Sport } from "./components/Sport";
import { Home } from "./components/Home";
import { Abacus } from "./components/Abacus";

// Routes
import routes from "./routes/routes";

//Redux
import { Provider } from "react-redux";
import store from "./store/store";

// Hooks
import { testContext } from "../src/hooks/useContext";

function App() {
  //This is jsut for the hooks tutorial not Abacus Express
  const [message, setMessage] = useState(
    "Hello from Context, declared in App.js"
  );
  const [user, setUser] = useState(null);
  //Prevents prodiver value chanigng unless message or setMessage change
  const provider = useMemo(() => ({ message, setMessage, user, setUser }), [
    message,
    setMessage,
    user,
    setUser,
  ]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <testContext.Provider value={provider}>
          <Switch>
            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.ELEMENTS} component={Elements} />
            <Route exact path={routes.HOOKS} component={Hooks} />
            <Route exact path={routes.SPORT} component={Sport} />
            <Route exact path={routes.ABACUS} component={Abacus} />
          </Switch>
        </testContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
