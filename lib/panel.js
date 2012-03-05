(function() {
  var Panel;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Panel = (function() {
    __extends(Panel, Stage);
    Panel.prototype.tag = 'section';
    Panel.prototype.viewport = false;
    function Panel() {
      var _ref, _ref2;
      Panel.__super__.constructor.apply(this, arguments);
      this.el.removeClass('stage').addClass('panel');
      if ((_ref = this.stage) == null) {
        this.stage = Stage.globalStage();
      }
      if ((_ref2 = this.stage) != null) {
        _ref2.add(this);
      }
      this.el.animate({
        translate3d: '100%, 0, 0'
      }, 0);
    }
    return Panel;
  })();
  (typeof module !== "undefined" && module !== null ? module.exports = Panel : void 0) || (this.Panel = Panel);
}).call(this);
