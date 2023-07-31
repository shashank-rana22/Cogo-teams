import { Toast } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { RENDER_VALUE_MAPPING, serviceDetails } from '../utils/detailsHelperFuncs';
import { formatRouteData } from '../utils/routeDataHelpers';

// const TO_FIXED_2 = 2;
export const SHIPMENT_LABELS = [
	'container_size',
	'containers_count',
	'packages_count',
	'container_type',
	'truck_type',
	'haulage_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'cargo_weight_per_container',
	'weight',
	'volume',
];

const STARTCASE_THE_LABELS = [
	'container_type',
	'truck_type',
	'haulage_type',
	'commodity',
	'inco_term',
];

const GET_FROM_RENDER_VALUE_MAPPING = ['container_size', 'packages_count', 'volume', 'weight'];

const handleCopyShipmentData = ({ shipmentItem }) => {
	const { serial_id = '', trade_type = '', shipment_type = '' } = shipmentItem || {};

	const { originDetails, destinationDetails } = formatRouteData({ item: shipmentItem });
	const details = serviceDetails({ detail: shipmentItem, service: shipment_type });

	// const { isLTL = false } = details;

	const shipmentDetails = (SHIPMENT_LABELS || []).reduce(
		(prev, label) => {
			let newString = prev;
			let value = details[label] || '';

			if (GET_FROM_RENDER_VALUE_MAPPING.includes(label)) {
				value = RENDER_VALUE_MAPPING?.[label]?.(details) || value;
			} else if (STARTCASE_THE_LABELS.includes(label)) {
				value = startCase(value);
			}

			if (!value || !shipmentItem?.[label]) {
				return newString;
			}

			// if (label === 'volume') {
			// 	value = `${Number(value)?.toFixed(TO_FIXED_2)} ${isLTL ? 'cc' : 'cbm'}`;
			// }

			newString += `\n${startCase(label)} : ${value}`;
			return newString;
		},
		'',
	);

	let textToCopy = `SID: ${serial_id}\n`;
	textToCopy += `POL: ${originDetails?.name}\n`;
	textToCopy += `POD: ${destinationDetails?.name}\n`;
	textToCopy += `Shipment Type: ${startCase(shipment_type)}\n`;
	textToCopy += `Trade: ${startCase(trade_type)}`;
	textToCopy += `${shipmentDetails}\n`;

	navigator.clipboard.writeText(textToCopy);
	Toast.success(`Successfully copied SID: ${serial_id}`);
};

export default handleCopyShipmentData;
