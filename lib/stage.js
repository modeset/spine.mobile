(function() {
  var $,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = Array.prototype.slice;

  $ = Spine.$;

  Spine.Mobile || (Spine.Mobile = {});

  Spine.Mobile.globalManager = new Spine.Manager;

  Spine.Mobile.Stage = (function(_super) {

    __extends(Stage, _super);

    Stage.globalManager = function() {
      return Spine.Mobile.globalManager;
    };

    Stage.globalStage = function() {
      return this.globalManager().controllers[0];
    };

    Stage.prototype.effectDefaults = {
      duration: 250,
      easing: 'ease-in-out'
    };

    Stage.prototype.effectOptions = function(options) {
      if (options == null) options = {};
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
        if (this.viewport) this.content.addClass('viewport');
        this.el.append(this.header);
        this.el.append(this.content);
        this.el.append(this.footer);
        Spine.Mobile.Stage.globalManager.add(this);
      }
    }

    Stage.prototype.append = function() {
      var e, elements, _i, _len, _results;
      elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        _results.push(this.content.append(e.el || e));
      }
      return _results;
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
      if (params == null) params = {};
      effect = params.transition || params.trans;
      if (effect) {
        return this.effects[effect].apply(this);
      } else {
        return this.el.addClass('active');
      }
    };

    Stage.prototype.deactivate = function(params) {
      var effect;
      if (params == null) params = {};
      if (!this.isActive()) return;
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
        var animation, opts,
          _this = this;
        this.el.addClass('active');
        this.el.addClass('transitioning');
        opts = this.effectOptions();
        animation = function() {
          return _this.el.animate({
            translate3d: '100%, 0, 0'
          }, 0, null, function() {
            return _this.el.animate({
              translate3d: '0, 0, 0'
            }, opts.duration, opts.easing, function() {
              _this.el.removeClass('transitioning');
              return _this.trigger('activated');
            });
          });
        };
        return setTimeout(animation, 0);
      },
      right: function() {
        var animation, opts,
          _this = this;
        this.el.addClass('active');
        this.el.addClass('transitioning');
        opts = this.effectOptions();
        animation = function() {
          return _this.el.animate({
            translate3d: '-100%, 0, 0'
          }, 0, null, function() {
            return _this.el.animate({
              translate3d: '0, 0, 0'
            }, opts.duration, opts.easing, function() {
              _this.el.removeClass('transitioning');
              return _this.trigger('activated');
            });
          });
        };
        return setTimeout(animation, 0);
      }
    };

    Stage.prototype.reverseEffects = {
      left: function() {
        var animation, opts,
          _this = this;
        opts = this.effectOptions();
        this.el.addClass('transitioning');
        animation = function() {
          return _this.el.animate({
            translate3d: '0, 0, 0'
          }, 0, null, function() {
            return _this.el.animate({
              translate3d: '-100%, 0, 0'
            }, opts.duration, opts.easing, function() {
              _this.el.removeClass('active');
              _this.el.removeClass('transitioning');
              return _this.trigger('deactivated');
            });
          });
        };
        return setTimeout(animation, 0);
      },
      right: function() {
        var animation, opts,
          _this = this;
        opts = this.effectOptions();
        this.el.addClass('transitioning');
        animation = function() {
          return _this.el.animate({
            translate3d: '0, 0, 0'
          }, 0, null, function() {
            return _this.el.animate({
              translate3d: '100%, 0, 0'
            }, opts.duration, opts.easing, function() {
              _this.el.removeClass('active');
              _this.el.removeClass('transitioning');
              return _this.trigger('deactivated');
            });
          });
        };
        return setTimeout(animation, 0);
      }
    };

    return Stage;

  })(Spine.Controller);

  Spine.Mobile.Stage.Global = (function(_super) {

    __extends(Global, _super);

    function Global() {
      Global.__super__.constructor.apply(this, arguments);
    }

    Global.prototype.global = true;

    return Global;

  })(Spine.Mobile.Stage);

}).call(this);
