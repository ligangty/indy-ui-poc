import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Root} from './Root.jsx';
import {APP_ROOT} from './ComponentConstants.js';

export const App = ()=> <HashRouter basename={APP_ROOT}>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="" element={<Root />} />
    </Routes>
  </HashRouter>;
