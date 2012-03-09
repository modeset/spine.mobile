class Spine.Model.Observer extends Spine.Module

    @include Spine.Log
    @extend Spine.Log

    @setup: ->
      @instance = new @
      @instance.bindEventHandlers()

    @teardown: ->
      @instance.unbindEventHandlers()
      delete @instance

    bindEventHandlers: ->
      @log 'Binding model delegate event handlers'

    unbindEventHandlers: ->
      @log 'Unbinding model delegate event handlers'
