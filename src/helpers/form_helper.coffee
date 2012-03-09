class Spine.FormHelper
  @serializedArrayToHash: (array) ->
    values = {}
    values[item.name] = item.value for item in array
    values
