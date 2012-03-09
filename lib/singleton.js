(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.Singleton = (function(_super) {

    __extends(Singleton, _super);

    function Singleton() {
      Singleton.__super__.constructor.apply(this, arguments);
    }

    Singleton.getInstance = function() {
      this.instance || (this.instance = new this);
      return this.instance;
    };

    return Singleton;

  })(Spine.Module);

}).call(this);
