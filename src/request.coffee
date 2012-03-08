class Spine.Request extends Spine.Module

  @extend Spine.Events
  @extend Spine.Log

  timeout: 15000
  defaultHost: 'localhost'

  @getProtocol: ->
    location.protocol

  @urlForPath: (path) ->
    "http#{if Request.getProtocol().match(/(https|file)/) && !@defaultHost.match(/local|dev/) then 's' else ''}://#{@defaultHost}/api#{path}"

  @perform: (options = {}) ->
    options['dataType'] or= 'json'
    options['url'] = Spine.Request.urlForPath(options.url)
    options['headers'] or= {}
    options['headers']['Accept'] or= 'application/json'
    options['contentType']  or= 'application/json'
    options['timeout'] or= Request.timeout
    $.ajax options
