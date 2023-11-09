import copyToClipboard from '../../../../../../utils/copyToClipboard';
import { RENDER_VALUE_MAPPING } from '../../../../../../utils/detailsHelperFuncs';
import { formatRouteData } from '../../../../../../utils/routeDataHelpers';

export const DATA_TO_SHOW = {
	trade_type                      : 'TRADE TYPE',
	container_size                  : 'CONTAINER SIZE',
	containers_count                : 'CONTAINERS COUNT',
	packages_count                  : 'PACKAGES COUNT',
	trucks_count                    : 'TRUCKS COUNT',
	truck_type                      : 'TRUCK TYPE',
	trip_type                       : 'TRIP TYPE',
	container_type                  : 'CONTAINER TYPE',
	commodity                       : 'COMMODITY',
	payment_term                    : 'PAYMENT TERM',
	inco_term                       : 'INCO TERM',
	packages                        : 'PACKAGES',
	volume                          : 'VOLUME',
	weight                          : 'WEIGHT',
	commodity_description           : 'COMMODITY DESCRIPTION',
	cargo_weight_per_container      : 'CARGO WEIGHT PER CONTAINER',
	hs_code                         : 'HS CODE',
	bl_type                         : 'BL TYPE',
	cargo_readiness_date            : 'CARGO READY DATE',
	schedule_departure              : 'SCHEDULE DEPARTURE',
	estimated_departure             : 'ESTIMATED DEPARTURE',
	transit_time                    : 'TRANSIT TIME',
	free_days_detention_destination : 'DESTINATION DETENTION FREE DAYS',
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
