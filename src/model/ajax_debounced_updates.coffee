Spine.Model.Ajax.DebouncedUpdates =

  extended: ->

    console.log 'Wiring up debounced Ajax updates'
    @unbind 'change', @ajaxChange

    @unbouncedAjaxChange = (record, type) ->
      record.debouncedAjax or= {}
      unless record.debouncedAjaxUpdate
        ajaxUpdate = (record, type) -> record.ajax()[type]()
        record.debouncedAjaxUpdate = _.debounce(ajaxUpdate, 2000)
      if type is 'update' and Spine.Ajax.enabled
        console.log 'debouncing ajax update', record, type
        record.debouncedAjaxUpdate(record, type)
      else
        record.ajax()[type]()

    @bind 'change', @unbouncedAjaxChange

