import Backbone from 'backbone'
import Shipment from '../models/shipment.js'

export default Backbone.Collection.extend({
    model: Shipment,
    mode: 'server',
    url: '/shipment/shipments',

    totalRecords: 0, 

    keyAttribute: 'SHIPPINGNAME',
    valueAttribute: 'SHIPPINGID',

    state: {
        pageSize: 15,
    },

    parseState: function(r, q, state, options) {
        return { totalRecords: r.total }
    },
        
    parseRecords: function(r, options) {
        return r.data
    },
    
    parse: function(response) {
        // Expected response {'total': 1, 'data':[{},{}]}
        this.totalRecords = response.total ? response.total : -1
        return response.data;
    }, 
})