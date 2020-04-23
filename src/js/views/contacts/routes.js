import Page from 'views/page.vue'

import LabContacts from 'views/contacts/labcontacts.vue'
import LabContact from 'views/contacts/labcontact.vue'

export default 
{
    path: '/contacts',
    name: 'contacts',
    component: Page,
    children: [
        {
            path: '',
            component: LabContacts,
        },
        {
            path: ':id',
            name: 'contact',
            component: LabContact,
            props: true
        },
    ]
}