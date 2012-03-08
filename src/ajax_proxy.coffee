class Spine.AjaxProxy extends Spine.Module

  @include Spine.Events

  @setup: (parentObject) ->
    if Spine.AjaxProxy.parentObject
      throw "ERROR: Can't set up another proxy when one's already set"
    Spine.AjaxProxy.parentObject = parentObject
    Spine.AjaxProxy.originalAjax = parentObject.ajax
    parentObject.ajax = Spine.AjaxProxy.proxiedAjax

  @teardown: ->
    if Spine.AjaxProxy.parentObject
      Spine.AjaxProxy.parentObject.ajax = Spine.AjaxProxy.originalAjax
      Spine.AjaxProxy.originalAjax = null
      Spine.AjaxProxy.parentObject = null

  @proxiedAjax: (opts) -> new Spine.AjaxProxy(opts)

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

    @request = Spine.AjaxProxy.originalAjax(opts)

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


Spine.AjaxProxy.setup($)
