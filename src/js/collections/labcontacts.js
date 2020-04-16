import Backbone from 'backbone'
import LabContact from '../models/labcontact.js'
       
let LabContacts = Backbone.Collection.extend({
    model: LabContact,
    url: '/contact',
    totalRecords: 0, 
    parse: function(response) {
        // Expected response {'total': 1, 'data':[{},{}]}
        this.totalRecords = response.total ? response.total : -1
        return response.data;
    },                 
    keyAttribute: 'CARDNAME',
    valueAttribute: 'LABCONTACTID',
})

export default LabContacts