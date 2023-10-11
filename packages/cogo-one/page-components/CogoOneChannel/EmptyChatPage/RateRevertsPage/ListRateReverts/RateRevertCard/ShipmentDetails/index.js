import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { LABELS } from '../../../../../../../constants/flashRatesMapping';
import { ICONS_MAPPING, SINGLE_LOCATIONS } from '../../../../../../../constants/shipmentConstants';
import SHIPMENT_TYPE_OPTIONS from '../../../../../../../constants/shipmentTypes';
import {
	RENDER_VALUE_MAPPING, serviceDetails,
} from '../../../../../../../utils/detailsHelperFuncs';
import { formatRouteData } from '../../../../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

const TRADE_TYPE_MAPPING = {
	import : 'Origin',
	export : 'Destination',
};

function PortDetails({ details = {} }) {
	return (
		<div className={styles.shipping_service}>
			<div className={styles.port_name}>
				(
				{details?.code}
				)
			</div>

			<div className={styles.country_name}>
				{details?.name}
			</div>
		</div>
	);
}

function ShipmentDetails({ cardData = {} }) {
	const { service_type = '', trade_type = '', shipping_line = {} } = cardData || {};

	const {
		short_name = '',
		business_name = '',
		logo_url = '',
	} = shipping_line || {};

	const details = serviceDetails({ detail: cardData, service: service_type });

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: cardData });

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	const isSingleLocation = SINGLE_LOCATIONS.includes(service_type);

	if (isSingleLocation) {
		return (
			<div className={styles.port_container}>
				<div className={styles.trade_type}>
					{TRADE_TYPE_MAPPING[trade_type]}
				</div>
				:
				<PortDetails
					details={DISPLAY_DATA_MAPPING[trade_type]}
				/>
			</div>
		);
	}

	const ActiveIcon = ICONS_MAPPING[service_type] || ICONS_MAPPING.default;

	return (
		<div className={styles.container}>
			<div className={styles.shipping_details}>
				<div className={styles.service_type}>
					<div className={styles.icon_container}>
						<ActiveIcon />
					</div>

					<div className={styles.service_label}>
						{SHIPMENT_TYPE_OPTIONS[service_type]?.label || startCase(service_type)}
					</div>
				</div>

				<div className={styles.shipping_line}>
					<PortDetails details={originDetails} />
					<div className={styles.shipping_service}>
						<img height="30px" width="90px" alt="logo" src={logo_url} />

						<div className={styles.service_provider}>
							{short_name || business_name}
						</div>
					</div>

					<PortDetails details={destinationDetails} />
				</div>
			</div>

			<div className={styles.commodity_details}>
				{(LABELS || []).map(
					(label) => {
						const value = RENDER_VALUE_MAPPING[label]?.(details) || details[label] || '';

						if (!value || !cardData?.[label]) {
							return null;
						}

						return <Pill size="sm" color="#FEF3E9" key={label}>{value}</Pill>;
					},
				)}
			</div>
		</div>
	);
}

export default ShipmentDetails;
