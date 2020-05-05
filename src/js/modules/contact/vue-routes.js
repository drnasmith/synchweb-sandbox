

import MarionetteView from 'views/marionette/marionette-wrapper.vue'
import Page from 'views/page.vue'

import ContactList from 'modules/contact/views/contacts.js'
import ContactView from 'modules/contact/views/viewcontact.js'

import Contacts from 'collections/labcontacts.js'
import Contact from 'models/labcontact.js'
import ProposalLookup from 'models/proplookup.js'

// import AddContact from 'modules/contact/views/addcontact.js'

import MarionetteApp from 'views/marionette/app.js'

export function routes() {
  // Initialize MarionetteApplication if not already existing
  let application = MarionetteApp()

  console.log("LOADING LEGACY CONTACT ROUTES")

    application.on('contact:show', function(cid) {
      console.log("Show contact")
      application.navigate('contacts/cid/'+cid)
        // controller.view(cid)
    })

    application.on('user:show', function(uid) {
      console.log("user:show")
      application.navigate('contacts/user/'+uid)
      // controller.edit_user(uid)
  })

  return routes = [
  {
    path: '/contacts',
    component: Page,
    children: [
      {
        path: '',
        name: 'legacy-contacts',
        component: MarionetteView,
        props: route => ({
          mview: ContactList, 
          options: {
            collection: new Contacts(null, { state: { currentPage: route.params.page ? parseInt(route.params.page) : 1}})
          },
        }),
      },
      {
        path: 'cid/:cid',
        component: MarionetteView,
        props: route => ({ 
          mview: ContactView, 
          options: {
            model: new Contact({ LABCONTACTID: route.params.cid })
          }
        }),
        beforeEnter: (to, from, next) => {
          console.log("Contact View proposal Lookup ... beforeEnter prop: " + app.prop + ", to: " + to.path + " cid=" + to.params.cid)
          var lookup = new ProposalLookup({ field: 'LABCONTACTID', value: to.params.cid })
          lookup.find({
            // If OK trigger next 
            success: function() {
              console.log("Calling next - Success")
              next()
            },
            error: function() {
              console.log("Calling next - Error, no proposal found")
              next('/')
            },
          })
        }
      },  
    ]
  },
  // {
  //   path: 'page/:page',
  //   component: MarionetteView,
  //   props: route => ({ 
  //     mview: ContactsView, 
  //     params: {
  //       page: route.params.page
  //     }
  //   })
  // },    
  // {
  //   path: 'add',
  //   component: MarionetteView,
  //   props: route => ({ 
  //     mview: AddContacts,
  //   })
  // },
    // // {
      //   path: 'user(/:pid)',
      //   component: MarionetteView,
      //   props: route => ({ 
      //     mview: ContactsView, 
      //     params: {
      //       cid: route.params.cid
      //     }
      //   })
      // },
  ]
}

// export default {foo}
// export legacyRoutes