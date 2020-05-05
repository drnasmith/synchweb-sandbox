import Page from 'views/page.vue'

import LabContacts from 'views/contacts/labcontacts.vue'
import LabContact from 'views/contacts/labcontact.vue'
import AddContact from 'views/contacts/addContact.vue'

export default 
[
    {
        path: '/vcontacts',
        component: Page,
        children: [
            {
                path: '',
                name: 'vcontacts',
                name: 'listContacts',
                component: LabContacts,
            },
            {
                path: 'add',
                name: 'addContact',
                component: AddContact,
            },
            // Adding /id makes route determination clearer - does not get confused with 'add' as :id
            {
                path: 'id/:id',
                name: 'contact',
                component: LabContact,
                props: true
            },
        ]
    }
]