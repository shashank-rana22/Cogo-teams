import { IcMError, IcMFairport, IcMFcl, IcMFtick } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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

const getMappingObject = ({ t }) => {
	const OCEAN_TITLE_MAPPING = {
		CONTAINER_NO       : t('airOceanTracking:tracking_card_mapping_label_1'),
		'BOOKING_NO/BL_NO' : t('airOceanTracking:tracking_card_mapping_label_2'),
	};
	const AIR_TITLE_MAPPING = t('airOceanTracking:tracking_card_mapping_label_3');

	const SHIPMENT_INFO_MAPPING = {
		container_no : t('airOceanTracking:tracking_card_mapping_label_4'),
		commodity    : t('airOceanTracking:tracking_card_mapping_label_5'),
	};

	const AIR_INFO_MAPPING = {
		weight    : t('airOceanTracking:tracking_card_mapping_label_6'),
		piece     : t('airOceanTracking:tracking_card_mapping_label_7'),
		commodity : t('airOceanTracking:tracking_card_mapping_label_5'),
	};

	const OCEAN_POC = {
		shipper   : t('airOceanTracking:tracking_card_mapping_label_8'),
		consignee : t('airOceanTracking:tracking_card_mapping_label_9'),
		dsr       : t('airOceanTracking:tracking_card_mapping_label_10'),
	};

	const AIR_POC = {
		shipper   : t('airOceanTracking:tracking_card_mapping_label_8'),
		consignee : t('airOceanTracking:tracking_card_mapping_label_9'),
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
	};
};

export default getMappingObject;
