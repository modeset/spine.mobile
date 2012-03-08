(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.AjaxProxy = (function(_super) {

    __extends(AjaxProxy, _super);

    AjaxProxy.include(Spine.Events);

    AjaxProxy.setup = function(parentObject) {
      if (Spine.AjaxProxy.parentObject) {
        throw "ERROR: Can't set up another proxy when one's already set";
      }
      Spine.AjaxProxy.parentObject = parentObject;
      Spine.AjaxProxy.originalAjax = parentObject.ajax;
      return parentObject.ajax = Spine.AjaxProxy.proxiedAjax;
    };

    AjaxProxy.teardown = function() {
      if (Spine.AjaxProxy.parentObject) {
        Spine.AjaxProxy.parentObject.ajax = Spine.AjaxProxy.originalAjax;
        Spine.AjaxProxy.originalAjax = null;
        return Spine.AjaxProxy.parentObject = null;
      }
    };

    AjaxProxy.proxiedAjax = function(opts) {
      return new Spine.AjaxProxy(opts);
    };

    function AjaxProxy(opts) {
      this.complete = __bind(this.complete, this);
      this.error = __bind(this.error, this);
      this.success = __bind(this.success, this);
      this.completeResponse = __bind(this.completeResponse, this);
      this.errorResponse = __bind(this.errorResponse, this);
      this.successResponse = __bind(this.successResponse, this);
      var complete, error, success;
      this.opts = opts;
      success = opts.success;
      if (success) this.bind('success', success);
      opts.success = this.successResponse;
      error = opts.error;
      if (error) if (error) this.bind('error', error);
      opts.error = this.errorResponse;
      complete = opts.complete;
      if (complete) if (error) this.bind('complete', complete);
      opts.complete = this.completeResponse;
      this.request = Spine.AjaxProxy.originalAjax(opts);
    }

    AjaxProxy.prototype.successResponse = function(data, status, xhr) {
      return this.trigger('success', data, status, xhr);
    };

    AjaxProxy.prototype.errorResponse = function(xhr, statusText, error) {
      return this.trigger('error', xhr, statusText, error);
    };

    AjaxProxy.prototype.completeResponse = function(xhr, status) {
      return this.trigger('complete', xhr, status);
    };

    AjaxProxy.prototype.success = function(callback) {
      var _this = this;
      this.bind('success', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    AjaxProxy.prototype.error = function(callback) {
      var _this = this;
      this.bind('error', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    AjaxProxy.prototype.complete = function(callback) {
      var _this = this;
      this.bind('complete', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    return AjaxProxy;

  })(Spine.Module);

  Spine.AjaxProxy.setup($);

}).call(this);
