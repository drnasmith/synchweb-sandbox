import Backbone from 'backbone'

let Model = Backbone.Model.extend({
    urlRoot: '/feedback',
    validation: {
        name: {
            required: true,
        },
        email: {
            required: true,
            pattern: 'email',
        },
        feedback: {
            required: true,
        },
    },
    
})

export default Model