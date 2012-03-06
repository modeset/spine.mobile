class Spine.Mobile.ScrollingPanel extends Spine.Mobile.Panel

  constructor: ->
    super
    @elements['.scroll_inner'] = 'scrollInner'
    @elements['.scroll_outer'] = 'scrollOuter'
    @elements['.scroll_bar']   = 'scrollBar'

    # Set up the scroller
    @shouldScroll = true
    @bind 'activated', =>
      @unbindScroller()
      @bindScroller()
    @bind 'deactivated', =>
      @unbindScroller()

  renderFragment: (name, context = {}) ->
    @html JST[name](context)
    @prepareScrollerElements()
    @trigger 'rendered'

  prepareScrollerElements: =>
    # wrap article contents with scroll inner element. also add scroll bar indicator
    @el.find('article').addClass('scroll_outer')
    @refreshElements()
    @scrollOuter.html("<div class='scroll_inner'>#{@scrollOuter.html()}</div><div class='scroll_bar'><div class='scroll_bar_pill'></div></div>")
    @refreshElements()

    $(@el.find('header')[0]).after("<div class='panel_disabler'></div>");
    @refreshElements()

  bindScroller: =>
    if @shouldScroll && !@scroller
      @scroller = new SectionFormScroller( @scrollOuter, @scrollInner, @scrollBar)
      @scroller.init()
      # Bind to destroy on release - this may be unnecessary since the controller will probably already have been deactivated
      @release(@unbindScroller)
      $(document).bind 'scroll_top', @scrollTop

  unbindScroller: =>
    if @scroller
      @scroller.dispose()
      @scroller = null
      $(document).unbind 'scroll_top'

  scrollTop: =>
    if @scroller
      @scroller.scrollToTop()
