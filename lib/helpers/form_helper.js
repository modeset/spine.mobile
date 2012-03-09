(function() {

  Spine.FormHelper = (function() {

    function FormHelper() {}

    FormHelper.serializedArrayToHash = function(array) {
      var item, values, _i, _len;
      values = {};
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        values[item.name] = item.value;
      }
      return values;
    };

    return FormHelper;

  })();

}).call(this);
