import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcAAirTracking,
	IcMAppCfs,
	IcMAppCustoms,
	IcMAppTruck,
	IcAWarehouse,
	IcMServices,
} from '@cogoport/icons-react';

const ICONS_MAPPING = {
	transportation    : <IcMAppTruck width={30} height={30} />,
	ftl_freight       : <IcMAppTruck width={30} height={30} />,
	ltl_freight       : <IcMAppTruck width={30} height={30} />,
	haulage_freight   : <IcMAppTruck width={28} height={28} />,
	fcl_customs       : <IcMAppCustoms width={28} height={28} />,
	air_customs       : <IcMAppCustoms width={28} height={28} />,
	fcl_cfs           : <IcMAppCfs width={28} height={28} />,
	fcl_freight_local : <IcMAppCfs width={28} height={28} />,
	air_freight_local : <IcMAppCfs width={28} height={28} />,
	air_freight       : <IcAAirTracking width={28} height={28} />,
	warehouse         : <IcAWarehouse width={28} height={28} />,
	fcl_freight       : <img
		src={GLOBAL_CONSTANTS.image_url.fcl_container_icon_s2c}
		alt="insurance"
		width={32}
		height={32}
	/>,
	subsidiary: <IcMServices width={28} height={28} />,
};

export default ICONS_MAPPING;
