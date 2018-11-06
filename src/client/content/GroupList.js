'use strict'

import React from 'react';
import {Utils} from '../Utils.js';
import '../styles/indy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {APP_ROOT} from '../Constants.js';
import ListControl from "./common/ListControl.js";
import {jsonGet} from "../RestClient.js";
import {JsonDebugger} from './common/JsonDebugger.js';

export default class GroupList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing: [],
      rawListing: [],
      disabledMap: {},
      enableDebug: false
    }
    this.createNew = this.createNew.bind(this);
    this.handleDebug = this.handleDebug.bind(this);
    this.hideAll = this.hideAll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getStores = this.getStores.bind(this);
    this.getDisTimeouts = this.getDisTimeouts.bind(this);
  }
  componentDidMount() {
    this.getStores();
  }
  getStores(){
    jsonGet('/api/admin/stores/_all/group',
      response => {
        this.setState({
          listing: response.items,
          rawListing: response.items,
        });
        this.getDisTimeouts();
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }
  getDisTimeouts(){
    jsonGet('/api/admin/schedule/store/all/disable-timeout',
      response => {
        let disabledMap = Utils.setDisableMap(response, this.state.listing);
        this.setState({
          disabledMap: disabledMap
        });
      },
      jqxhr => {
        this.setState({
          message: JSON.parse(jqxhr.responseText).error
        });
      }
    );
  }
  createNew(event){
    //mock
  }
  hideAll(event){
    //mock
  }
  handleSearch(event){
    this.setState({
      listing: Utils.searchByKeyForNewStores(event.target.value, this.state.rawListing)
    });
  }
  handleDebug(event){
    this.setState({
      enableDebug: event.target.checked
    })
  }
  render(){
    let listing = this.state.listing;
    let disMap = this.state.disabledMap;
    return (
      <div className="container-fluid">
        <ListControl
          useHideAll={true} handleHideAll={this.hideAll}
          useSearch={true} handleSearch={this.handleSearch}
          useDebug={true} handleDebug={this.handleDebug}
          handleCreateNew={this.createNew} />
        <div className="content-panel">
          <div className="store-listing">
            {
              listing.map( store => {
                let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
                return (
                  <GroupListItem key={store.key} store={store} storeClass={storeClass} disableMap={disMap} />
                )
              })
            }
          </div>
        </div>

        <JsonDebugger enableDebug={this.state.enableDebug} jsonObj={this.state.listing} />
      </div>
    );
  }
}

class GroupListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hideConstituents: true
    }
    this.displayConstituents = this.displayConstituents.bind(this);
    this.hideConstituents = this.hideConstituents.bind(this);
  }

  displayConstituents(event){
    event.preventDefault();
    this.setState({
      hideConstituents: false
    });
  }

  hideConstituents(event){
    event.preventDefault();
    this.setState({
      hideConstituents: true
    });
  }

  render(){
    let store = this.props.store;
    let storeClass = this.props.storeClass;
    let disMap = this.props.disableMap;
    let constituents = this.props.store.constituents ? Utils.reConstituents(store) : undefined;
    return (
      <div className="store-listing-item">
        <div className="fieldset-caption">
          <a href={`${APP_ROOT}/group/${store.packageType}/view/${store.name}`}>
            <span className={storeClass}>{store.packageType}-{store.name}</span>
          </a>
        </div>
        <div className="fieldset">
          <div>
            <div className="left-half">
              <label>Local URL:</label>
              <a href={Utils.storeHref(store.key)} target="_new">{Utils.storeHref(store.key)}</a>
            </div>
            <div className="options-field field right-half">
              <div className="inline-label">
                {store.constituents && store.constituents.length} Constituent(s) [
                <span className="option">
                  {
                    this.state.hideConstituents ?
                    <a href="#" onClick={this.displayConstituents}>+</a> :
                    <a href="#" onClick={this.hideConstituents}>-</a>
                  }
                </span>
                ]
              </div>
              {
                !this.state.hideConstituents && constituents &&
                (
                  <ol className="content-panel subsection">
                    {
                      constituents.map(function(item){
                        let itemStoreClass = Utils.isDisabled(item.key, disMap)? "disabled-store":"enabled-store";
                        return (
                          <li key={item.key}>
                            <a href={`${APP_ROOT}/${item.type}/${item.packageType}/view/${item.name}`}>
                                <span className={itemStoreClass}>{item.key}</span>
                            </a>
                            {
                              item.type==='remote' &&
                              (
                                <div className="subfields">
                                 <span className="description field">(Remote URL: <a target="_new" href={Utils.storeHref(item.key)}>{Utils.storeHref(item.key)}</a>)</span>
                                </div>
                              )
                            }
                          </li>
                        );
                      })
                    }
                  </ol>
                )
              }
            </div>
          </div>
          <div className="description field"><span>{store.description}</span></div>
        </div>
      </div>
    );
  }
}