import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import axios from 'axios';
import {Utils} from '../CompUtils';

const StoreEditControlPanel = ({handleSave, handleCancel, handleRemove}) => <div className="cp-row">
    <button name="save" onClick={handleSave} className="cp-button">Save</button>{'  '}
    <button name="cancel" onClick={handleCancel} className="cp-button">Cancel</button>{'  '}
    <button name="del" onClick={handleRemove} className="del-button cp-button">
      Delete
    </button>
  </div>;
StoreEditControlPanel.propTypes={
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
  handleRemove: PropTypes.func
};

const StoreViewControlPanel = function({enabled, storeObj, handleDisable, handleEnable}){
  const [enableText, enableHandler] = enabled?["Disable",handleDisable]:["Enable",handleEnable];
  const navigate = useNavigate();

  const [pkgType, storeType, storeName] = [storeObj.packageType, storeObj.type, storeObj.name];
  const storeUrl = `/api/admin/stores/${pkgType}/${storeType}/${storeName}`;
  const handleRemove = async ()=>{
    const response = await axios.delete(storeUrl).catch(error =>{
      // TODO: Some other way to handle errors?
      Utils.logMessage(error);
    });
    if(response && response.status===204){
      // TODO: Some other way to show deletion success?
      Utils.logMessage("Store deleted.");
    }
    navigate(`/${storeObj.type}`);
  };

  return(
    <div className="cp-row-group">
      <div className="cp-row">
        <button onClick={enableHandler}>{enableText}</button>
      </div>
      <div className="cp-row">
        <button onClick={()=>navigate(`/${storeType}/${pkgType}/edit/${storeName}`)}>Edit</button>{'  '}
        <button onClick={()=>navigate(`/${storeType}/new`)}>New...</button>{'  '}
        <button name="del" onClick={handleRemove} className="del-button cp-button">
          Delete
        </button>
      </div>
    </div>
  );
};

StoreViewControlPanel.propTypes={
  enabled: PropTypes.bool,
  storeObj: PropTypes.object,
  // storeType: PropTypes.string,
  // pkgType: PropTypes.string,
  // storeName: PropTypes.string,
  handleDisable: PropTypes.func,
  handleEnable: PropTypes.func
};

export {StoreEditControlPanel, StoreViewControlPanel};
