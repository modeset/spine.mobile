$     = Spine.$

Spine.Mobile or= {}

Spine.Mobile.globalManager = new Spine.Manager

class Spine.Mobile.Stage extends Spine.Controller
  @globalManager: -> Spine.Mobile.globalManager
  @globalStage:   -> @globalManager().controllers[0]

  effectDefaults:
    duration: 250
    easing: 'ease-in-out'

  effectOptions: (options = {})  ->
    $.extend({}, @effectDefaults, options)

  viewport: true

  elements:
    'header':   'header'
    'article':  'content'
    'footer':   'footer'

  constructor: ->
    super
    @el.addClass('stage')

    if @global
      @header  = $('<header />')
      @content = $('<article />')
      @footer  = $('<footer />')

      @content.addClass('viewport') if @viewport

      @el.append @header
      @el.append @content
      @el.append @footer

      Spine.Mobile.globalManager.add(@)

  append: (elements...) ->
    @content.append(e.el or e) for e in elements

  html: ->
    @el.html.apply(@el, arguments)
    @refreshElements()
    @el

  add: (panels...) ->
    @manager or= new Spine.Manager
    @manager.add(panels...)
    @append(panels...)

  activate: (params = {}) ->
    effect = params.transition or params.trans
    if effect
      @effects[effect].apply(this)
    else
      @el.addClass('active')

  deactivate: (params = {}) ->
    return unless @isActive()
    effect = params.transition or params.trans
    if effect
      @reverseEffects[effect].apply(this)
    else
      @el.removeClass('active')

  isActive: ->
    @el.hasClass('active')

  effects:
    left: ->
      @el.addClass 'active'
      @el.addClass 'transitioning'
      opts = @effectOptions()

      animation = =>
        @el.animate { translate3d: '100%, 0, 0' }, 0, null, =>
          @el.animate { translate3d: '0, 0, 0' }, opts.duration, opts.easing, =>
            @el.removeClass 'transitioning'
            @trigger 'activated'
      setTimeout animation, 0

    right: ->
      @el.addClass 'active'
      @el.addClass 'transitioning'
      opts = @effectOptions()

      animation = =>
        @el.animate { translate3d: '-100%, 0, 0' }, 0, null, =>
          @el.animate { translate3d: '0, 0, 0' }, opts.duration, opts.easing, =>
            @el.removeClass 'transitioning'
            @trigger 'activated'
      setTimeout animation, 0

  reverseEffects:
    left: ->
      opts = @effectOptions()
      @el.addClass 'transitioning'
      animation = =>
        @el.animate { translate3d: '0, 0, 0' }, 0, null, =>
          @el.animate { translate3d: '-100%, 0, 0' }, opts.duration, opts.easing, =>
            @el.removeClass 'active'
            @el.removeClass 'transitioning'
            @trigger 'deactivated'
      setTimeout animation, 0

    right: ->
      opts = @effectOptions()
      @el.addClass 'transitioning'
      animation = =>
        @el.animate { translate3d: '0, 0, 0' }, 0, null, =>
          @el.animate { translate3d: '100%, 0, 0' }, opts.duration, opts.easing, =>
            @el.removeClass 'active'
            @el.removeClass 'transitioning'
            @trigger 'deactivated'
      setTimeout animation, 0

class Spine.Mobile.Stage.Global extends Spine.Mobile.Stage
  global: true
