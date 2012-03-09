(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.Model.Ajax.ZeptoShim = (function(_super) {

    __extends(ZeptoShim, _super);

    ZeptoShim.include(Spine.Events);

    ZeptoShim.setup = function(parentObject) {
      var klass;
      klass = Spine.Model.Ajax.ZeptoShim;
      if (klass.parentObject) {
        throw "ERROR: Can't set up another proxy when one's already set";
      }
      klass.parentObject = parentObject;
      klass.originalAjax = parentObject.ajax;
      return parentObject.ajax = klass.proxiedAjax;
    };

    ZeptoShim.teardown = function() {
      var klass;
      klass = Spine.Model.Ajax.ZeptoShim;
      if (klass.parentObject) {
        klass.parentObject.ajax = klass.originalAjax;
        klass.originalAjax = null;
        return klass.parentObject = null;
      }
    };

    ZeptoShim.proxiedAjax = function(opts) {
      return new Spine.Model.Ajax.ZeptoShim(opts);
    };

    function ZeptoShim(opts) {
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
      this.request = Spine.Model.Ajax.ZeptoShim.originalAjax(opts);
    }

    ZeptoShim.prototype.successResponse = function(data, status, xhr) {
      return this.trigger('success', data, status, xhr);
    };

    ZeptoShim.prototype.errorResponse = function(xhr, statusText, error) {
      return this.trigger('error', xhr, statusText, error);
    };

    ZeptoShim.prototype.completeResponse = function(xhr, status) {
      return this.trigger('complete', xhr, status);
    };

    ZeptoShim.prototype.success = function(callback) {
      var _this = this;
      this.bind('success', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    ZeptoShim.prototype.error = function(callback) {
      var _this = this;
      this.bind('error', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    ZeptoShim.prototype.complete = function(callback) {
      var _this = this;
      this.bind('complete', function() {
        callback.apply(_this, arguments);
        return true;
      });
      return this;
    };

    return ZeptoShim;

  })(Spine.Module);

  Spine.Model.Ajax.ZeptoShim.setup($);

}).call(this);
