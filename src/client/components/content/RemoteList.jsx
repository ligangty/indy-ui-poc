import {React, useEffect, useState} from 'react';
import {ListJsonDebugger} from './Debugger.jsx';
import ListControl from "./ListControl.jsx";
import {remoteOptionLegend as options} from "../ComponentConstants.js";
import {Utils} from '../CompUtils.js';
import {StoreListingWidget} from './CommonPageWidget.jsx';

const init = (state, setState) => {
  useEffect(()=>{
    Utils.getStores(state, setState, "remote");
  }, [state.listing]);
};

const handlers = {
  createNew: () => {
    // mock
  },
  handleDebug: (event, setState) => {
    setState({
      enableDebug: event.target.checked
    });
  },
  handleSearch: (event, rawList, setState) => {
    setState({
      listing: Utils.searchByKeyForNewStores(event.target.value, rawList)
    });
  }
};

export default function RemoteList() {
  const [state, setState] = useState({
    listing: [],
    rawListing: [],
    disabledMap: {},
    enableDebug: false,
    message: ''
  });

  init(state, setState);
  let listing = state.listing;
  let disMap = state.disabledMap;
  let orderBys = [
    {value: 'key', text: 'Name'},
    {value: 'url', text: 'Remote URL'}
  ];
  return (
    <div className="container-fluid">
      <ListControl
        useSearch={true} handleSearch={event => handlers.handleSearch(event, state.rawListing, setState)}
        useOrderBy={true} orderBys={orderBys}
        useLegend={true} legends={options}
        useDebug={true} handleDebug={event => handlers.handleDebug(event, setState)}
        handleCreateNew={handlers.createNew} />
      <StoreListingWidget StoreList={listing} DisMap={disMap} StoreType="remote" />
      <ListJsonDebugger enableDebug={state.enableDebug} jsonObj={state.listing} />
    </div>
  );
}
