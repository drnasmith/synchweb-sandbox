import Page from 'views/page.vue'

import AddShipment from 'views/shipment/addShipment.vue'
import ListShipments from 'views/shipment/shipmentList.vue'
import ViewShipment from 'views/shipment/shipmentView.vue'

export default 
{
    path: '/shipments',
    name: 'shipments',
    component: Page,
    children: [
      {
        path: '',
        name: 'listShipments',
        component: ListShipments
      },
      {
        path: 'new',
        name: 'addShipment2',
        component: AddShipment
      },
      {
        path: ':id',
        name: 'viewShipment',
        component: ViewShipment,
        props: true
      }
    ]
}