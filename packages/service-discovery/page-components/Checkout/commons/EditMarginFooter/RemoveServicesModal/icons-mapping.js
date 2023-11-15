import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppCfs, IcMAppCustoms, IcMAppTruck, IcMServices } from '@cogoport/icons-react';

const ICONS_MAPPING = {
	transportation    : <IcMAppTruck width={16} height={16} />,
	haulage_freight   : <IcMAppTruck width={16} height={16} />,
	fcl_customs       : <IcMAppCustoms width={16} height={16} />,
	air_customs       : <IcMAppCustoms width={16} height={16} />,
	fcl_cfs           : <IcMAppCfs width={16} height={16} />,
	fcl_freight_local : <IcMAppCfs width={16} height={16} />,
	air_freight_local : <IcMAppCfs width={16} height={16} />,
	fcl_freight       : <img
		src={GLOBAL_CONSTANTS.image_url.fcl_container_icon_s2c}
		alt="insurance"
		width={16}
		height={16}
	/>,
	subsidiary  : <IcMServices width={16} height={16} />,
	ftl_freight : <IcMAppTruck width={16} height={16} />,
	ltl_freight : <IcMAppTruck width={16} height={16} />,
};

export default ICONS_MAPPING;
