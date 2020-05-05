

import MarionetteView from 'views/marionette/marionette-wrapper.vue'
import Page from 'views/page.vue'
import CalendarView from 'modules/calendar/views/calendar.js'
import CurrentView from 'modules/calendar/views/current.js'

export default 
[
    {
        path: '/calendar',
        name: 'calendar',
        component: MarionetteView,
        props: { mview: CalendarView}
      },
      {
        path: '/current',
        name: 'current',
        component: MarionetteView,
        props: { mview: CurrentView }
      },
      {
        path: '/cal',
        component: Page,
        children: [
          {
            path: '',
            name: 'cal',
            component: MarionetteView,
            props: route => ({ 
              mview: CalendarView, 
              options: {
                all: 1
              }
            })
          },
          {
            path: 'bl/:bl',
            component: MarionetteView,
            props: route => ({ 
              mview: CalendarView, 
              options: {
                all: 1, 
                bl: route.params.bl
              }
            })
          }
        ]
      }
]