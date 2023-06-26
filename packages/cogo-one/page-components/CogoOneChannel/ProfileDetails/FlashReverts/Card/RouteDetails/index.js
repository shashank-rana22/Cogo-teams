import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import { SERVICE_TYPE_MAPPING, SINGLE_LOCATIONS } from '../../../../../../constants/flashRatesMapping';
import { formatRouteData } from '../../../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

function RouteDetails({ item = {} }) {
	const { service_type = '', data } = item;

	const { shipment_serial_id = '', trade_type = '' } = data || {};

	const isSingleLocation = SINGLE_LOCATIONS.includes(service_type);

	const {
		originDisplay,
		destinationDisplay,
		originMainDisplay,
		destinationMainDisplay,
	} = formatRouteData({ item, serviceType: service_type });

	const { icon: Icon, label = '' } = SERVICE_TYPE_MAPPING[service_type];

	return (
		<div className={styles.rate_card}>
			<div className={styles.header_flex}>
				{shipment_serial_id && (
					<div className={styles.sid}>
						COGO-
						{shipment_serial_id}
					</div>
				)}
				<div className={styles.icon_flex}>
					{Icon || null}
					&nbsp;
					{label}
				</div>
			</div>
			<div className={styles.location}>
				{(!isSingleLocation || trade_type === 'import') && (
					<Tooltip
						content={originDisplay}
						placement="top"
					>
						<div className={styles.each_location}>
							{originDisplay}
						</div>
					</Tooltip>
				)}
				{originMainDisplay && (
					<Tooltip
						content={originMainDisplay}
						placement="top"
					>
						<div className={styles.each_location}>
							{originMainDisplay}
						</div>
					</Tooltip>
				)}
				{!isSingleLocation && (
					<IcMPortArrow height={10} width={10} />
				)}
				{(!isSingleLocation || trade_type === 'export') && (
					<Tooltip
						content={destinationDisplay}
						placement="top"
					>
						<div className={styles.each_location}>
							{destinationDisplay}
						</div>
					</Tooltip>
				)}
				{destinationMainDisplay && (
					<Tooltip
						content={destinationMainDisplay}
						placement="top"
					>
						<div className={styles.each_location}>
							{destinationMainDisplay}
						</div>
					</Tooltip>
				)}
			</div>
		</div>
	);
}
export default RouteDetails;
