import Page from 'views/page.vue'

import AddShipment from 'views/shipment/addShipment.vue'
import ListShipments from 'views/shipment/shipmentList.vue'
import ViewShipment from 'views/shipment/shipmentView.vue'

export default 
[
  {
    path: '/shipments',
    component: Page,
    children: [
      {
        path: '',
        name: 'shipments',
        name: 'listShipments',
        component: ListShipments
      },
      {
        path: 'new',
        name: 'addShipment',
        component: AddShipment
      },
      {
        path: 'id/:id',
        name: 'viewShipment',
        component: ViewShipment,
      }
    ]
  }
]