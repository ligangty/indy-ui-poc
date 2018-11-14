'use strict'

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/indy.css';
import RemoteList from './RemoteList.js';
import HostedList from './HostedList.js';
import GroupList from './GroupList.js';
import RemoteView from './RemoteView.js';
import HostedView from './HostedView.js';
import GroupView from './GroupView.js';
import RemoteEdit from './RemoteEdit.js';
import {APP_ROOT} from '../ComponentConstants.js'


const browseCompatible=`<!--[if lt IE 7]>
    <p className="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->`;

const isHome = false;

const Container = () => (
  <div>
     {/*browseCompatible*/}
    <div>
       {
         isHome?
         "Welcome! Make a selection from the menu above to proceed.":
         (
           <Switch>
            <Route exact path={`${APP_ROOT}/remote`} component={RemoteList} />
            <Route exact path={`${APP_ROOT}/hosted`} component={HostedList} />
            <Route exact path={`${APP_ROOT}/group`} component={GroupList} />

            <Route path={`${APP_ROOT}/remote/:packageType/view/:name`} component={RemoteView} />
            <Route path={`${APP_ROOT}/hosted/:packageType/view/:name`} component={HostedView} />
            <Route path={`${APP_ROOT}/group/:packageType/view/:name`} component={GroupView} />
            {
            <Route exact path={[`${APP_ROOT}/remote/new`,`${APP_ROOT}/remote/:packageType/edit/:name`]} component={RemoteEdit} />
            // <Route exact path={[`${APP_ROOT}/hosted/new`,`${APP_ROOT}/hosted/:packageType/edit/:name`]} component={HostedEdit} />
            // <Route exact path={[`${APP_ROOT}/group/new`,`${APP_ROOT}/group/:packageType/edit/:name`]} component={GroupEdit} />

            // <Route exact path={[`${APP_ROOT}/nfc`, `${APP_ROOT}/nfc/view/all`, `${APP_ROOT}/nfc/view/:packageType/:type/:name`]} component={} />
            //
            // <Route exact path={`${APP_ROOT}/logout`} component={} />
            }
           </Switch>
         )
       }
      </div>
  </div>
);


export default Container;
