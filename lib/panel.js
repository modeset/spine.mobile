(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine.Mobile.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.prototype.tag = 'section';

    Panel.prototype.viewport = false;

    function Panel() {
      var _ref;
      Panel.__super__.constructor.apply(this, arguments);
      this.el.removeClass('stage').addClass('panel');
      if (this.stage == null) this.stage = Spine.Mobile.Stage.globalStage();
      if ((_ref = this.stage) != null) _ref.add(this);
      this.el.animate({
        translate3d: '100%, 0, 0'
      }, 0);
    }

    return Panel;

  })(Spine.Mobile.Stage);

}).call(this);
