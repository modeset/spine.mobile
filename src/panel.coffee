class Panel extends Stage

  tag:      'section'
  viewport: false

  constructor: ->
    super

    # Register with the global stage
    @el.removeClass('stage').addClass('panel')
    @stage ?= Stage.globalStage()
    @stage?.add(@)

    # Make sure we render the panel offscreen
    @el.animate({translate3d: '100%, 0, 0'}, 0)

(module?.exports = Panel) or @Panel = Panel
