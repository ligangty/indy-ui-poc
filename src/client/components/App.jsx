import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Root} from './Root.jsx';

export const App = ()=> <HashRouter basename="">
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="*" element={<Root />} />
    </Routes>
  </HashRouter>;
