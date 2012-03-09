(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.Model.Observer = (function(_super) {

    __extends(Observer, _super);

    function Observer() {
      Observer.__super__.constructor.apply(this, arguments);
    }

    Observer.include(Spine.Log);

    Observer.extend(Spine.Log);

    Observer.setup = function() {
      this.instance = new this;
      return this.instance.bindEventHandlers();
    };

    Observer.teardown = function() {
      this.instance.unbindEventHandlers();
      return delete this.instance;
    };

    Observer.prototype.bindEventHandlers = function() {
      return this.log('Binding model delegate event handlers');
    };

    Observer.prototype.unbindEventHandlers = function() {
      return this.log('Unbinding model delegate event handlers');
    };

    return Observer;

  })(Spine.Module);

}).call(this);
