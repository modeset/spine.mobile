Spine.Model.Timestamps =
  extended: ->
    @bind 'beforeSave', (model) ->
    console.log "Updating timestamps", model
    model.updated_at = new Date
    model.created_at = new Date if model.newRecord
