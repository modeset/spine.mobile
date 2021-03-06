class Spine.Mobile.Panel extends Spine.Mobile.Stage

  tag:      'section'
  viewport: false

  constructor: ->
    super

    # Register with the global stage
    @el.removeClass('stage').addClass('panel')
    @stage ?= Spine.Mobile.Stage.globalStage()
    @stage?.add(@)

    # Make sure we render the panel offscreen
    @el.animate({translate3d: '100%, 0, 0'}, 0)
