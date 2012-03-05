(function() {
  var $, Stage, globalManager;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = Spine.$;
  globalManager = new Spine.Manager;
  Stage = (function() {
    __extends(Stage, Spine.Controller);
    Stage.globalManager = function() {
      return globalManager;
    };
    Stage.globalStage = function() {
      return this.globalManager().controllers[0];
    };
    Stage.prototype.effectDefaults = {
      duration: 250,
      easing: 'ease-in-out'
    };
    Stage.prototype.effectOptions = function(options) {
      if (options == null) {
        options = {};
      }
      return $.extend({}, this.effectDefaults, options);
    };
    Stage.prototype.viewport = true;
    Stage.prototype.elements = {
      'header': 'header',
      'article': 'content',
      'footer': 'footer'
    };
    function Stage() {
      Stage.__super__.constructor.apply(this, arguments);
      this.el.addClass('stage');
      if (this.global) {
        this.header = $('<header />');
        this.content = $('<article />');
        this.footer = $('<footer />');
        if (this.viewport) {
          this.content.addClass('viewport');
        }
        this.el.append(this.header);
        this.el.append(this.content);
        this.el.append(this.footer);
      }
      if (this.global) {
        globalManager.add(this);
      }
    }
    Stage.prototype.append = function() {
      var e, elements, _ref;
      elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      elements = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          e = elements[_i];
          _results.push(e.el || e);
        }
        return _results;
      })();
      return (_ref = this.content).append.apply(_ref, elements);
    };
    Stage.prototype.html = function() {
      this.el.html.apply(this.el, arguments);
      this.refreshElements();
      return this.el;
    };
    Stage.prototype.add = function() {
      var panels, _ref;
      panels = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.manager || (this.manager = new Spine.Manager);
      (_ref = this.manager).add.apply(_ref, panels);
      return this.append.apply(this, panels);
    };
    Stage.prototype.activate = function(params) {
      var effect;
      if (params == null) {
        params = {};
      }
      effect = params.transition || params.trans;
      if (effect) {
        return this.effects[effect].apply(this);
      } else {
        return this.el.addClass('active');
      }
    };
    Stage.prototype.deactivate = function(params) {
      var effect;
      if (params == null) {
        params = {};
      }
      if (!this.isActive()) {
        return;
      }
      effect = params.transition || params.trans;
      if (effect) {
        return this.reverseEffects[effect].apply(this);
      } else {
        return this.el.removeClass('active');
      }
    };
    Stage.prototype.isActive = function() {
      return this.el.hasClass('active');
    };
    Stage.prototype.effects = {
      left: function() {
        var animation, opts;
        this.el.addClass('active');
        this.el.addClass('transitioning');
        opts = this.effectOptions();
        animation = __bind(function() {
          return this.el.animate({
            translate3d: '100%, 0, 0'
          }, 0, null, __bind(function() {
            return this.el.animate({
              translate3d: '0, 0, 0'
            }, opts.duration, opts.easing, __bind(function() {
              this.el.removeClass('transitioning');
              return this.trigger('activated');
            }, this));
          }, this));
        }, this);
        return setTimeout(animation, 0);
      },
      right: function() {
        var animation, opts;
        this.el.addClass('active');
        this.el.addClass('transitioning');
        opts = this.effectOptions();
        animation = __bind(function() {
          return this.el.animate({
            translate3d: '-100%, 0, 0'
          }, 0, null, __bind(function() {
            return this.el.animate({
              translate3d: '0, 0, 0'
            }, opts.duration, opts.easing, __bind(function() {
              this.el.removeClass('transitioning');
              return this.trigger('activated');
            }, this));
          }, this));
        }, this);
        return setTimeout(animation, 0);
      }
    };
    Stage.prototype.reverseEffects = {
      left: function() {
        var animation, opts;
        opts = this.effectOptions();
        this.el.addClass('transitioning');
        animation = __bind(function() {
          return this.el.animate({
            translate3d: '0, 0, 0'
          }, 0, null, __bind(function() {
            return this.el.animate({
              translate3d: '-100%, 0, 0'
            }, opts.duration, opts.easing, __bind(function() {
              this.el.removeClass('active');
              this.el.removeClass('transitioning');
              return this.trigger('deactivated');
            }, this));
          }, this));
        }, this);
        return setTimeout(animation, 0);
      },
      right: function() {
        var animation, opts;
        opts = this.effectOptions();
        this.el.addClass('transitioning');
        animation = __bind(function() {
          return this.el.animate({
            translate3d: '0, 0, 0'
          }, 0, null, __bind(function() {
            return this.el.animate({
              translate3d: '100%, 0, 0'
            }, opts.duration, opts.easing, __bind(function() {
              this.el.removeClass('active');
              this.el.removeClass('transitioning');
              return this.trigger('deactivated');
            }, this));
          }, this));
        }, this);
        return setTimeout(animation, 0);
      }
    };
    return Stage;
  })();
  Stage.Global = (function() {
    __extends(Global, Stage);
    function Global() {
      Global.__super__.constructor.apply(this, arguments);
    }
    Global.prototype.global = true;
    return Global;
  })();
  (typeof module !== "undefined" && module !== null ? module.exports = Stage : void 0) || (this.Stage = Stage);
}).call(this);
