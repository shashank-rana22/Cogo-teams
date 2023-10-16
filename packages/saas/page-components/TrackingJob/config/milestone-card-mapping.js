import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMError, IcMFairport, IcMFcl, IcMFtick } from '@cogoport/icons-react';

export const DEFAULT_STATUS = {
	ocean : [false, false, false, false],
	air   : [true, true, true, true],
};

export const SEVERITY_MAPPING = {
	HIGH: {
		title : 'Attention Needed',
		icon  : <IcMError fill="#EE3425" width={20} height={20} />,
		class : 'error',

	},
	LOW: {
		title : 'On Track',
		icon  : <IcMFtick fill="#ABCD62" width={20} height={20} />,
		class : 'success',

	},
};

const OCEAN_MILESTONE_ICON = {
	VESSEL : GLOBAL_CONSTANTS.image_url.ship_icon,
	TRUCK  : GLOBAL_CONSTANTS.image_url.truck_icon,
	RAIL   : GLOBAL_CONSTANTS.image_url.truck_icon,
};

const AIR_MILESTONE_ICON = {
	AIR: GLOBAL_CONSTANTS.image_url.air_icon2,
};
const SURFACE_MILESTONE_ICON = {
	TRUCK: GLOBAL_CONSTANTS.image_url.truck_icon,
};

const getMappingObject = () => {
	const OCEAN_TITLE_MAPPING = {
		CONTAINER_NO       : 'Container No.',
		'BOOKING_NO/BL_NO' : 'BL/Booking No:',
	};
	const AIR_TITLE_MAPPING = 'Airway bill No';

	const SHIPMENT_INFO_MAPPING = {
		container_no : 'Container no',
		commodity    : 'Commodity',
	};

	const AIR_INFO_MAPPING = {
		weight    : 'Weight',
		piece     : 'Piece',
		commodity : 'Commodity',
	};

	const OCEAN_POC = {
		shipper   : 'Is Shipper?',
		consignee : 'Is Consignee?',
		dsr       : 'Include Shipment in Status Report',
	};

	const AIR_POC = {
		shipper   : 'Is Shipper?',
		consignee : 'Is Consignee?',
	};

	return {
		ocean: {
			SHIPMENT_TITLE   : 'Container Details',
			SHIPMENT_INFO    : SHIPMENT_INFO_MAPPING,
			LOADING_ICON     : <IcMFcl width={150} height={150} fill="#d3d3d3" />,
			DEFAULT_STATUS   : [false, false, false, false],
			CARD_TITLE       : OCEAN_TITLE_MAPPING,
			EMPTY_STATE_INFO : 'container / shipment',
			POC_MAPPING      : OCEAN_POC,
			TRACKER_ID_KEY   : 'saas_container_subscription_id',
			MILESTONE_ICON   : OCEAN_MILESTONE_ICON,

		},
		air: {
			SHIPMENT_TITLE   : 'Cargo Details',
			SHIPMENT_INFO    : AIR_INFO_MAPPING,
			LOADING_ICON     : <IcMFairport width={150} height={150} fill="#d3d3d3" />,
			DEFAULT_STATUS   : [true, true, true, true],
			CARD_TITLE       : AIR_TITLE_MAPPING,
			EMPTY_STATE_INFO : 'cargo / shipment',
			POC_MAPPING      : AIR_POC,
			TRACKER_ID_KEY   : 'saas_air_subscription_id',
			MILESTONE_ICON   : AIR_MILESTONE_ICON,

		},
		surface: {
			SHIPMENT_TITLE   : 'Cargo Details',
			SHIPMENT_INFO    : AIR_INFO_MAPPING,
			LOADING_ICON     : <IcMFairport width={150} height={150} fill="#d3d3d3" />,
			DEFAULT_STATUS   : [true, true, true, true],
			CARD_TITLE       : AIR_TITLE_MAPPING,
			EMPTY_STATE_INFO : 'cargo / shipment',
			POC_MAPPING      : AIR_POC,
			TRACKER_ID_KEY   : 'saas_air_subscription_id',
			MILESTONE_ICON   : SURFACE_MILESTONE_ICON,
		},
	};
};

export default getMappingObject;
