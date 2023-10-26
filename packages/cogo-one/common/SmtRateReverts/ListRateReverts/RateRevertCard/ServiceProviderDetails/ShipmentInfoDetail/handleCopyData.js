import copyToClipboard from '../../../../../../utils/copyToClipboard';
import { RENDER_VALUE_MAPPING } from '../../../../../../utils/detailsHelperFuncs';
import { formatRouteData } from '../../../../../../utils/routeDataHelpers';

export const DATA_TO_SHOW = {
	trade_type                      : 'Trade Type',
	container_size                  : 'Container Size',
	containers_count                : 'Containers Count',
	packages_count                  : 'Packages Count',
	trucks_count                    : 'Trucks Count',
	truck_type                      : 'Truck Type',
	trip_type                       : 'Trip Type',
	container_type                  : 'Container Type',
	commodity                       : 'Commodity',
	payment_term                    : 'Payment Term',
	inco_term                       : 'Inco Term',
	packages                        : 'Packages',
	volume                          : 'Volume',
	weight                          : 'Weight',
	commodity_description           : 'Commodity Description',
	cargo_weight_per_container      : 'Cargo Weight Per Container',
	hs_code                         : 'Hs Code',
	bl_type                         : 'BL Type',
	cargo_readiness_date            : 'Cargo Ready Date',
	schedule_departure              : 'Schedule Departure',
	estimated_departure             : 'Expected Departure',
	transit_time                    : 'Transit Time',
	free_days_detention_destination : 'Destination Detention Free Days',
};

export function handleCopyData({ serialId = '', details = {} }) {
	let textToCopy = `Serial ID: ${serialId}\n`;

	const {
		originDetails = {},
		destinationDetails = {},
	} = formatRouteData({ item: details });

	textToCopy += originDetails?.name ? `Origin Port: ${originDetails?.name}\n` : '';
	textToCopy += destinationDetails?.name ? `Destination Port: ${destinationDetails?.name}\n` : '';

	Object.entries(DATA_TO_SHOW)?.forEach(
		([key, label]) => {
			const displayValue = RENDER_VALUE_MAPPING?.[key]?.(details, true);

			if (displayValue) {
				textToCopy += `${label}: ${displayValue}\n`;
			}
		},
	);

	copyToClipboard({ label: 'Shipment Data', content: textToCopy });
}
