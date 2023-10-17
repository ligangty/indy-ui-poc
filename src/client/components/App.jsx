import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import NavHeader from './nav/NavHeader.jsx';
import NavFooter from './nav/NavFooter.jsx';
import {Main} from './content/Main.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/indy.css';

const Root = () => <React.Fragment>
    <NavHeader />
    <Main />
    <NavFooter />
  </React.Fragment>;

export const App = ()=> <HashRouter basename="">
    <Routes>
      <Route path="*" element={<Root />} />
    </Routes>
  </HashRouter>;
