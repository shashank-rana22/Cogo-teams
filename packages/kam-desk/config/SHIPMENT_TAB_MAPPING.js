import airFreight from './AIR_FREIGHT_TABS';
import fclFreight from './FCL_FREIGHT_TABS.json';
import lclFreight from './LCL_FREIGHT_TABS.json';
import surface from './SURFACE.json';

const ShipmentTabMapping = {
	fcl_freight : fclFreight,
	lcl_freight : lclFreight,
	air_freight : airFreight,
	surface,
};

export default ShipmentTabMapping;
