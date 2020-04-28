import React from 'react';
import Main from '../pages/Main';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CommonContext } from "../context/CommonContext";
import Menu from "../pages/Menu";
import Capture from "../pages/Capture";
import '../index.css';
import Home from "../pages/Home";

const theme = createMuiTheme({
    drawerWidth: 320,
    typography: {
      fontFamily: 'jua',
      button: {
        fontFamily: "jua"
      },
      body1: {
        fontWeight: 500
      }
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundColor: "white"
          }
        }
      }
    }
  });
  

class App extends React.Component {
    render(){
        return (
            <CommonContext.Provider value={{}}>
            <MuiThemeProvider theme={theme}>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/Main" component={Main} />
                  <Route path="/Menu" component={Menu} />
                  <Route path="/Capture" component={Capture} />
                  {/*}
                  <Redirect to="/not-found" />
            {*/}
                </Switch>
              </BrowserRouter>
            </MuiThemeProvider>
          </CommonContext.Provider>
        );
    }
}

export default App;