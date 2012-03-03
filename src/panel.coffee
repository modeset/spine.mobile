class Panel extends Stage

  tag:      'section'
  viewport: false

  constructor: ->
    super
    @elements['.scroll_inner'] = 'scrollInner'
    @elements['.scroll_outer'] = 'scrollOuter'
    @elements['.scroll_bar']   = 'scrollBar'

    # Register with the global stage
    @el.removeClass('stage').addClass('panel')
    @stage ?= Stage.globalStage()
    @stage?.add(@)

    # Set up the scroller
    @shouldScroll = true
    @bind 'activated', =>
      @unbindScroller()
      @bindScroller()
    @bind 'deactivated', =>
      @unbindScroller()

    # Make sure we render the panel offscreen
    @el.animate({translate3d: '100%, 0, 0'}, 0)

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

(module?.exports = Panel) or @Panel = Panel
