/**
 * Message Class
 * This class is used for passing data between modules,
 * client and server.
 **/
var M = function( ok, opts ){
  this._meta      = {};
  this._data      = {};

  // check the status
  this._meta.status  = (ok) ? "success" : "error";
  this._meta.message = (ok) ? "success" : "error";
  this._meta.code    = (ok) ? 200 : 500;

  // check for simple message
  if(typeof opts === "string"){
    this._meta.message = (ok) ? "success" : "error";  

  // otherwise assume data
  } else {
    opts = opts || {};
    this._data         = opts.data      || false;
    this._meta.message = opts.message   || this._meta.message || "";
    this._meta.code    = opts.code      || this._meta.code    || 200;
  }

  this._data = opts.data || {};
}

/**
 * Check for error.
 * If error is true, run the error callback if it exists and return true.
 * Otherwise run the success callback. ( if exists )
 * Log errors.
 **/
M.prototype.error = function(){
  if(this._meta.status === "error"){
    if(typeof this._meta.errorCallback === "function"){
      this._meta.errorCallback(this);
    }
    return true;
  }

  if(typeof this._meta.errorCallback === "function"){
    this._meta.successCallback(this);
  }
  return false;
}

/**
 * Gets the data object.
 **/
M.prototype.data = function(){
  return this._data;
}

/**
 * Gets the data object.
 **/
M.prototype.meta = function(){
  return this._meta;
}

exports.M = M;


