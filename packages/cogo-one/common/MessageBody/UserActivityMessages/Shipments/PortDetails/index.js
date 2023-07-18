import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { SINGLE_LOCATIONS } from '../../../../../constants/flashRatesMapping';
import { formatRouteData } from '../../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

function PortDetails({ serviceData = {}, service = '' }) {
	const { trade_type: tradeType = '' } = serviceData || {};
	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: serviceData });

	const isSingleLocation = SINGLE_LOCATIONS.includes(service);

	const TRADE_TYPE_MAPPING = {
		import : 'Origin',
		export : 'Destination',
	};

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	if (isSingleLocation) {
		return (
			<div className={styles.container}>
				<div className={styles.flex_row_origin}>
					<div className={styles.label}>{TRADE_TYPE_MAPPING[tradeType]}</div>
				</div>

				<div className={styles.flex_row_origin}>
					<div className={styles.port_details}>

						<Tooltip content={DISPLAY_DATA_MAPPING[tradeType]?.name} placement="bottom">
							<div className={styles.port_name}>
								{DISPLAY_DATA_MAPPING[tradeType]?.name}
							</div>
						</Tooltip>

						<div className={styles.port_codes}>
							(
							{DISPLAY_DATA_MAPPING[tradeType]?.code}
							)
						</div>
					</div>

					<div className={styles.country}>
						{DISPLAY_DATA_MAPPING[tradeType]?.country}
					</div>

				</div>
			</div>
		);
	}

	return (
		<div className={styles.port_pair}>
			<div className={styles.port}>
				<div className={styles.port_details}>

					<Tooltip content={originDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{originDetails?.name}
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{originDetails?.code}
						)
					</div>
				</div>

				<div className={styles.country}>
					{startCase(originDetails?.country)}
				</div>

			</div>
			<IcMPortArrow width={22} height={22} />
			<div className={styles.port}>
				<div className={styles.port_details}>
					<Tooltip content={destinationDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{destinationDetails?.name}
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{destinationDetails?.code}
						)
					</div>
				</div>
				<div className={styles.country}>
					{destinationDetails?.country}
				</div>
			</div>
		</div>
	);
}

export default PortDetails;
