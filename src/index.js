const Request = require('request');
const SteamID = require('steamid');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';

require('util').inherits(SteamInventory, require('events').EventEmitter);

module.exports = SteamInventory;

function SteamInventory(options) {
  options = options || {};

  this.SteamID = SteamID;
  this._jar = Request.jar();
  this._httpRequestID = 0;
  this.accessToken = null;

  var defaults = {
    jar: this._jar,
    timeout: options.timeout || 50000,
    gzip: true,
    headers: {
      'User-Agent': options.userAgent || USER_AGENT,
    },
  };

  if (typeof options == 'string') {
    options = {
      localAddress: options,
    };
  }
  this._options = options;

  if (options.localAddress) {
    defaults.localAddress = options.localAddress;
  }

  this.request = options.request || Request.defaults({ forever: true });
  this.request = this.request.defaults(defaults);

  this._setCookie(Request.cookie('Steam_Language=english'));
  this._setCookie(Request.cookie('timezoneOffset=0,0'));
}

SteamInventory.prototype._setCookie = function (cookie, secure) {
  var protocol = secure ? 'https' : 'http';
  cookie.secure = !!secure;

  if (cookie.domain) {
    this._jar.setCookie(cookie.clone(), protocol + '://' + cookie.domain);
  } else {
    this._jar.setCookie(cookie.clone(), protocol + '://steamcommunity.com');
    this._jar.setCookie(cookie.clone(), protocol + '://store.steampowered.com');
    this._jar.setCookie(cookie.clone(), protocol + '://help.steampowered.com');
  }
};

SteamInventory.prototype.setCookies = function (cookies) {
  cookies.forEach(cookie => {
    var cookieName = cookie.trim().split('=')[0];
    if (cookieName == 'steamLogin' || cookieName == 'steamLoginSecure') {
      this.steamID = new SteamID(cookie.match(/steamLogin(Secure)?=(\d+)/)[2]);
    }

    this._setCookie(
      Request.cookie(cookie),
      !!(cookieName.match(/^steamMachineAuth/) || cookieName.match(/Secure$/)),
    );

    if (cookieName == 'steamLoginSecure') {
      var cookieValueMatch = cookie.match(/steamLoginSecure=([^;]+)/);

      if (cookieValueMatch) {
        var cookieValue = decodeURIComponent(cookieValueMatch[1].trim());
        var accessToken = cookieValue.split('||')[1];

        this.accessToken = accessToken;
      }
    }
  });
};

require('./components/http.js');
require('./components/inventory.js');
