import { cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import { SINGLE_LOCATIONS } from '../../../constants/shipmentConstants';
import { formatRouteData } from '../../../utils/routeDataHelpers';

import styles from './styles.module.css';

const TRADE_TYPE_MAPPING = {
	import : 'Origin',
	export : 'Destination',
};

function PortDetails({ details = {} }) {
	return (
		<div className={styles.port_details}>
			<div className={styles.port_name}>
				{details?.name}
			</div>

			<div className={cl`${styles.port_name} ${styles.country_name}`}>
				{details?.country}
			</div>
		</div>
	);
}

function ShippingRoute({ shipmentItem = {} }) {
	const { trade_type: tradeType = '', shipment_type = '' } = shipmentItem;

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: shipmentItem });

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	const isSingleLocation = SINGLE_LOCATIONS.includes(shipment_type);

	if (isSingleLocation) {
		return (
			<div className={styles.port_container}>
				<div className={styles.trade_type}>
					{TRADE_TYPE_MAPPING[tradeType]}
				</div>
				:
				<PortDetails
					details={DISPLAY_DATA_MAPPING[tradeType]}
				/>
			</div>
		);
	}

	return (
		<div className={styles.port_container}>
			<PortDetails
				details={originDetails}
			/>
			<IcMPortArrow height={20} width={20} />
			<PortDetails
				details={destinationDetails}
			/>
		</div>
	);
}

export default ShippingRoute;
