import Marionette from 'backbone.marionette'

var MyView = Marionette.View.extend({
	template: "<a href='#'>This is a Marionette Link dynamically injected</a>",
	render: function() {
		this.$el.html(this.template);
        return this;
	}
});

export default MyView