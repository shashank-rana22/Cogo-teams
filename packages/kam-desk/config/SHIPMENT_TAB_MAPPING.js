import airFreight from './AIR_FREIGHT_TABS';
import commonTabs from './COMMON_TABS';
import fclFreight from './FCL_FREIGHT_TABS.json';
import lclFreight from './LCL_FREIGHT_TABS.json';
import surface from './SURFACE.json';

const ShipmentTabMapping = {
	fcl_freight : fclFreight,
	lcl_freight : lclFreight,
	air_freight : airFreight,
	surface,
	all         : {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'pending_invoice', 'source', 'payment_term', 'tags'],
	},
};

export default ShipmentTabMapping;
