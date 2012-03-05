(function() {
  var ScrollingPanel;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  ScrollingPanel = (function() {
    __extends(ScrollingPanel, Panel);
    function ScrollingPanel() {
      this.scrollTop = __bind(this.scrollTop, this);
      this.unbindScroller = __bind(this.unbindScroller, this);
      this.bindScroller = __bind(this.bindScroller, this);
      this.prepareScrollerElements = __bind(this.prepareScrollerElements, this);      ScrollingPanel.__super__.constructor.apply(this, arguments);
      this.elements['.scroll_inner'] = 'scrollInner';
      this.elements['.scroll_outer'] = 'scrollOuter';
      this.elements['.scroll_bar'] = 'scrollBar';
      this.shouldScroll = true;
      this.bind('activated', __bind(function() {
        this.unbindScroller();
        return this.bindScroller();
      }, this));
      this.bind('deactivated', __bind(function() {
        return this.unbindScroller();
      }, this));
    }
    ScrollingPanel.prototype.renderFragment = function(name, context) {
      if (context == null) {
        context = {};
      }
      this.html(JST[name](context));
      this.prepareScrollerElements();
      return this.trigger('rendered');
    };
    ScrollingPanel.prototype.prepareScrollerElements = function() {
      this.el.find('article').addClass('scroll_outer');
      this.refreshElements();
      this.scrollOuter.html("<div class='scroll_inner'>" + (this.scrollOuter.html()) + "</div><div class='scroll_bar'><div class='scroll_bar_pill'></div></div>");
      this.refreshElements();
      $(this.el.find('header')[0]).after("<div class='panel_disabler'></div>");
      return this.refreshElements();
    };
    ScrollingPanel.prototype.bindScroller = function() {
      if (this.shouldScroll && !this.scroller) {
        this.scroller = new SectionFormScroller(this.scrollOuter, this.scrollInner, this.scrollBar);
        this.scroller.init();
        this.release(this.unbindScroller);
        return $(document).bind('scroll_top', this.scrollTop);
      }
    };
    ScrollingPanel.prototype.unbindScroller = function() {
      if (this.scroller) {
        this.scroller.dispose();
        this.scroller = null;
        return $(document).unbind('scroll_top');
      }
    };
    ScrollingPanel.prototype.scrollTop = function() {
      if (this.scroller) {
        return this.scroller.scrollToTop();
      }
    };
    return ScrollingPanel;
  })();
  (typeof module !== "undefined" && module !== null ? module.exports = ScrollingPanel : void 0) || (this.ScrollingPanel = Panel);
}).call(this);
