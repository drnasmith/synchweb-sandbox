import Backbone from 'backbone'

var LinkView = Backbone.View.extend({
	template: "<a href='#'>This is a Backbone View Link</a>",
	render: function() {
		this.$el.html(this.template);
        return this;
	}
});

export default LinkView