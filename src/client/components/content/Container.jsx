import React from 'react';
import {Route, Routes} from 'react-router-dom';
import RemoteList from './RemoteList.jsx';
import HostedList from './HostedList.jsx';
import GroupList from './GroupList.jsx';
import RemoteView from './RemoteView.jsx';
import HostedView from './HostedView.jsx';
import GroupView from './GroupView.jsx';
import RemoteEdit from './RemoteEdit.jsx';
import {APP_ROOT} from '../ComponentConstants.js';


// const browseCompatible=`<!--[if lt IE 7]>
//     <p className="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
// <![endif]-->`;

// const isHome = false;

const Home = () => <React.Fragment>Welcome! Make a selection from the menu above to proceed.</React.Fragment>;

export const Container = () => <div>
    {
     // browseCompatible
    }
    <React.Fragment>
      <Routes>
        <Route exact path={`${APP_ROOT}`} element={<Home />} />
        <Route exact path={`${APP_ROOT}/remote`} element={<RemoteList />} />
        <Route exact path={`${APP_ROOT}/hosted`} element={<HostedList />} />
        <Route exact path={`${APP_ROOT}/group`} element={<GroupList />} />

        <Route path={`${APP_ROOT}/remote/:packageType/view/:name`} element={<RemoteView />} />
        <Route path={`${APP_ROOT}/hosted/:packageType/view/:name`} element={<HostedView />} />
        <Route path={`${APP_ROOT}/group/:packageType/view/:name`} element={<GroupView />} />

        <Route exact path={`${APP_ROOT}/remote/new`} element={<RemoteEdit />} />
        <Route exact path={`${APP_ROOT}/remote/:packageType/edit/:name`} element={<RemoteEdit />} />
        {
        // <Route exact path={[`${APP_ROOT}/hosted/new`,`${APP_ROOT}/hosted/:packageType/edit/:name`]} element={HostedEdit} />
        // <Route exact path={[`${APP_ROOT}/group/new`,`${APP_ROOT}/group/:packageType/edit/:name`]} element={GroupEdit} />

        // <Route exact path={[`${APP_ROOT}/nfc`, `${APP_ROOT}/nfc/view/all`, `${APP_ROOT}/nfc/view/:packageType/:type/:name`]} element={} />
        //
        // <Route exact path={`${APP_ROOT}/logout`} element={} />
        }
      </Routes>
    </React.Fragment>
  </div>;
