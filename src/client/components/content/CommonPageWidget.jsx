import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {Utils} from '../CompUtils.js';

const LocalURLSection = ({storeKey}) => <div className="left-half">
    <label>Local URL:</label>{' '}
    <a href={Utils.storeHref(storeKey)} target="_new">{Utils.storeHref(storeKey)}</a>
  </div>;

LocalURLSection.propTypes = {
  storeKey: PropTypes.string
};

const CapabilitiesSection = ({options}) => <div className="left-half">
    <label>Capabilities:</label>{' '}
    {
      options.map(option => <div key={option.title} className="options">
          <span className="key">{option.icon} </span>
        </div>)
    }
  </div>;

CapabilitiesSection.propTypes = {
  options: PropTypes.array
};

const StoreNameSection = ({store, storeClass}) => <div className="fieldset-caption">
    <Link to={`/${store.type}/${store.packageType}/view/${store.name}`}>
      <span className={storeClass}>{store.packageType}-{store.name}</span>
    </Link>
  </div>;

StoreNameSection.propTypes = {
  store: PropTypes.object,
  storeClass: PropTypes.string
};

const StoreListingWidget = ({StoreList, DisMap, StoreType}) => {
  let listing = StoreList;
  let disMap = DisMap;
  if(listing && listing.size >0){
    return (
      <div className="content-panel">
        <div className="store-listing">
          {
            listing.map(store => {
              let storeClass = Utils.isDisabled(store.key, disMap)? "disabled-store":"enabled-store";
              return (
                <div key={store.key} className="store-listing-item">
                  <StoreNameSection store={store} storeClass={storeClass} />
                  <div className="fieldset">
                    <div>
                      <LocalURLSection storeKey={store.key} />
                      {
                        StoreType === "remote" && <div className="right-half">
                          <label>Remote URL:</label>
                          <a href={store.url} target="_new">{store.url}</a>
                        </div>
                      }
                    </div>
                    <div>
                      <CapabilitiesSection options={Utils.remoteOptions(store)} />
                    </div>
                    <div className="description field"><span>{store.description}</span></div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  return <Fragment></Fragment>;
};

StoreListingWidget.propTypes = {
  StoreList: PropTypes.array,
  DisMap: PropTypes.object,
  StoreType: PropTypes.string
};


export {LocalURLSection, CapabilitiesSection, StoreNameSection, StoreListingWidget};
