const SteamInventory = require('../index.js');

SteamInventory.prototype.httpRequest = function (
  uri,
  options,
  callback,
  source,
) {
  if (typeof uri === 'object') {
    source = callback;
    callback = options;
    options = uri;
    uri = options.url || options.uri;
  } else if (typeof options === 'function') {
    source = callback;
    callback = options;
    options = {};
  }

  options.url = options.uri = uri;

  if (this._httpRequestConvenienceMethod) {
    options.method = this._httpRequestConvenienceMethod;
    delete this._httpRequestConvenienceMethod;
  }

  if ((options.method || 'GET').toUpperCase() != 'GET') {
    options.headers = options.headers || {};
    if (!options.headers.origin) {
      var parsedUrl = new URL(options.url);
      options.headers.origin = parsedUrl.protocol + '//' + parsedUrl.host;
    }
  }

  var requestID = ++this._httpRequestID;
  source = source || '';

  var self = this;
  var continued = false;

  if (
    !this.onPreHttpRequest ||
    !this.onPreHttpRequest(requestID, source, options, continueRequest)
  ) {
    continueRequest(null);
  }

  function continueRequest(err) {
    if (continued) {
      return;
    }

    continued = true;

    if (err) {
      if (callback) {
        callback(err);
      }

      return;
    }

    self.request(options, function (err, response, body) {
      var hasCallback = !!callback;
      var httpError =
        options.checkHttpError !== false &&
        self._checkHttpError(err, response, callback, body);
      var communityError =
        !options.json &&
        options.checkCommunityError !== false &&
        self._checkCommunityError(body, httpError ? function () {} : callback);
      var tradeError =
        !options.json &&
        options.checkTradeError !== false &&
        self._checkTradeError(
          body,
          httpError || communityError ? function () {} : callback,
        );
      var jsonError =
        options.json && options.checkJsonError !== false && !body
          ? new Error('Malformed JSON response')
          : null;

      self.emit(
        'postHttpRequest',
        requestID,
        source,
        options,
        httpError || communityError || tradeError || jsonError || null,
        response,
        body,
        {
          hasCallback: hasCallback,
          httpError: httpError,
          communityError: communityError,
          tradeError: tradeError,
          jsonError: jsonError,
        },
      );

      if (hasCallback && !(httpError || communityError || tradeError)) {
        if (jsonError) {
          callback.call(self, jsonError, response);
        } else {
          callback.apply(self, arguments);
        }
      }
    });
  }
};

SteamInventory.prototype.httpRequestGet = function () {
  this._httpRequestConvenienceMethod = 'GET';
  return this.httpRequest.apply(this, arguments);
};

SteamInventory.prototype.httpRequestPost = function () {
  this._httpRequestConvenienceMethod = 'POST';
  return this.httpRequest.apply(this, arguments);
};

SteamInventory.prototype._notifySessionExpired = function (err) {
  this.emit('sessionExpired', err);
};

SteamInventory.prototype._checkHttpError = function (
  err,
  response,
  callback,
  body,
) {
  if (err) {
    callback(err, response, body);
    return err;
  }

  if (
    response.statusCode >= 300 &&
    response.statusCode <= 399 &&
    response.headers.location.indexOf('/login') != -1
  ) {
    err = new Error('Not Logged In');
    callback(err, response, body);
    this._notifySessionExpired(err);
    return err;
  }

  if (
    response.statusCode == 403 &&
    typeof response.body === 'string' &&
    response.body.match(
      /<div id="parental_notice_instructions">Enter your PIN below to exit Family View.<\/div>/,
    )
  ) {
    err = new Error('Family View Restricted');
    callback(err, response, body);
    return err;
  }

  if (response.statusCode >= 400) {
    err = new Error('HTTP error ' + response.statusCode);
    err.code = response.statusCode;
    callback(err, response, body);
    return err;
  }

  return false;
};

SteamInventory.prototype._checkCommunityError = function (html, callback) {
  var err;

  if (typeof html === 'string' && html.match(/<h1>Sorry!<\/h1>/)) {
    var match = html.match(/<h3>(.+)<\/h3>/);
    err = new Error(match ? match[1] : 'Unknown error occurred');
    callback(err);
    return err;
  }

  if (
    typeof html === 'string' &&
    html.indexOf('g_steamID = false;') > -1 &&
    html.indexOf('<title>Sign In</title>') > -1
  ) {
    err = new Error('Not Logged In');
    callback(err);
    this._notifySessionExpired(err);
    return err;
  }

  return false;
};

SteamInventory.prototype._checkTradeError = function (html, callback) {
  if (typeof html !== 'string') {
    return false;
  }

  var match = html.match(/<div id="error_msg">\s*([^<]+)\s*<\/div>/);
  if (match) {
    var err = new Error(match[1].trim());
    callback(err);
    return err;
  }

  return false;
};
