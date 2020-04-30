// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import rootReducer from './store';
// import { Provider } from 'react-redux';

// import './index.css';
// import App from './components/App';
// import * as serviceWorker from './serviceWorker';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// // 리덕스 개발자 도구 적용
// const devTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(rootReducer, devTools);

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: 'CookieRun Bold',
//   },
//   div:{
//     fontSize : 'x-large'
//   }
// });

// // ReactDOM.render(
// //   <Provider store={store}>
// //     <App />
// //   </Provider>,
// //   document.getElementById('root')
// // );

// ReactDOM.render(
//   <React.StrictMode theme={theme}>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );



// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App';
import store from "./store";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
