class Spine.Singleton extends Spine.Module

  @getInstance: ->
    @instance or= new @
    return @instance
