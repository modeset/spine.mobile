(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.Request = (function(_super) {

    __extends(Request, _super);

    function Request() {
      Request.__super__.constructor.apply(this, arguments);
    }

    Request.extend(Spine.Events);

    Request.extend(Spine.Log);

    Request.timeout = 15000;

    Request.getProtocol = function() {
      return location.protocol;
    };

    Request.urlForPath = function(path) {
      var backendHost;
      backendHost = 'topfan-backend.dev';
      return "http" + (Request.getProtocol().match(/(https|file)/) && !backendHost.match(/local|dev/) ? 's' : '') + "://" + backendHost + "/api" + path;
    };

    Request.perform = function(options) {
      var _base;
      if (options == null) options = {};
      options['dataType'] || (options['dataType'] = 'json');
      options['url'] = Spine.Request.urlForPath(options.url, options.token_auth);
      options['headers'] || (options['headers'] = {});
      (_base = options['headers'])['Accept'] || (_base['Accept'] = 'application/json');
      options['contentType'] || (options['contentType'] = 'application/json');
      options['timeout'] || (options['timeout'] = Request.timeout);
      return $.ajax(options);
    };

    return Request;

  })(Spine.Module);

}).call(this);
