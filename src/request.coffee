class Spine.Request extends Spine.Module

  @extend Spine.Events
  @extend Spine.Log

  @timeout = 15000

  @getProtocol: ->
    location.protocol

  @urlForPath: (path) ->
    backendHost = 'topfan-backend.dev'
    "http#{if Request.getProtocol().match(/(https|file)/) && !backendHost.match(/local|dev/) then 's' else ''}://#{backendHost}/api#{path}"

  @perform: (options = {}) ->
    options['dataType'] or= 'json'
    options['url'] = Spine.Request.urlForPath(options.url, options.token_auth)
    options['headers'] or= {}
    options['headers']['Accept'] or= 'application/json'
    options['contentType']  or= 'application/json'
    options['timeout'] or= Request.timeout
    $.ajax options
