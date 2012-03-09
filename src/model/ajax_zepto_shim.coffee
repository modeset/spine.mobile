class Spine.Model.Ajax.ZeptoShim extends Spine.Module

  @include Spine.Events

  @setup: (parentObject) ->
    klass = Spine.Model.Ajax.ZeptoShim 
    throw "ERROR: Can't set up another proxy when one's already set" if klass.parentObject
    klass.parentObject = parentObject
    klass.originalAjax = parentObject.ajax
    parentObject.ajax = klass.proxiedAjax

  @teardown: ->
    klass = Spine.Model.Ajax.ZeptoShim 
    if klass.parentObject
      klass.parentObject.ajax = klass.originalAjax
      klass.originalAjax = null
      klass.parentObject = null

  @proxiedAjax: (opts) -> new Spine.Model.Ajax.ZeptoShim(opts)

  constructor: (opts) ->
    @opts = opts

    success = opts.success
    if success
      @bind 'success', success
    opts.success = @successResponse

    error = opts.error
    if error
      @bind 'error', error if error
    opts.error = @errorResponse

    complete = opts.complete
    if complete
      @bind 'complete', complete if error
    opts.complete = @completeResponse

    @request = Spine.Model.Ajax.ZeptoShim.originalAjax(opts)

  successResponse: (data, status, xhr) =>
    @trigger 'success', data, status, xhr

  errorResponse: (xhr, statusText, error) =>
    @trigger 'error', xhr, statusText, error

  completeResponse: (xhr, status) =>
    @trigger 'complete', xhr, status

  success: (callback) =>
    @bind 'success', =>
      callback.apply(@, arguments)
      true
    @

  error: (callback) =>
    @bind 'error', =>
      callback.apply(@, arguments)
      true
    @

  complete: (callback) =>
    @bind 'complete', =>
      callback.apply(@, arguments)
      true
    @


Spine.Model.Ajax.ZeptoShim.setup($)
