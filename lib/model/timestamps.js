(function() {

  Spine.Model.Timestamps = {
    extended: function() {
      this.bind('beforeSave', function(model) {});
      console.log("Updating timestamps", model);
      model.updated_at = new Date;
      if (model.newRecord) return model.created_at = new Date;
    }
  };

}).call(this);
