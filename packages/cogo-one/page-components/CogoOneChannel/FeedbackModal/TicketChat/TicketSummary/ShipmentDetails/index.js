import { Placeholder } from '@cogoport/components';

import { ROUTES_MAPPING, SINGLE_LOCATIONS, TRADE_TYPE_MAPPING } from '../../../../../../constants/shipmentConstants';
import { formatRouteData } from '../../../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

function PortDetails({ details = {}, listLoading = false }) {
	return (
		<div className={styles.port_details}>
			{listLoading ? <Placeholder width="80px" height="18px" margin="0 0 0 4px" />
				: (
					<div className={styles.port_name}>
						{details?.name || '-'}
					</div>
				)}
		</div>
	);
}

function ShipmentDetails({
	serialId = '', t = () => {}, service = '', partnerId = '',
	shipmentData = {}, listLoading = false,
}) {
	const { shipment_type = '', trade_type: tradeType = '', id = '' } = shipmentData || {};

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: shipmentData });

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	const handleRouteBooking = ({ e }) => {
		e.stopPropagation();
		let shipmentDetailsPage;
		if (Object.keys(ROUTES_MAPPING || {}).includes(service)) {
			const route = ROUTES_MAPPING?.[service];

			shipmentDetailsPage = `${window.location.origin}/v2/${partnerId}/booking/${route}/${id}`;
		} else {
			shipmentDetailsPage = `${window.location.origin}/${partnerId}/shipments/${id}`;
		}

		window.open(shipmentDetailsPage, '_blank');
	};

	const isSingleLocation = SINGLE_LOCATIONS?.includes(shipment_type);

	if (!serialId) {
		return null;
	}

	return (
		<>
			<div role="presentation" className={styles.sid} onClick={(e) => handleRouteBooking({ e })}>
				{t('myTickets:sid')}
				:
				<span className={styles.number}>
					{serialId}
				</span>
			</div>
			{isSingleLocation ? (
				<div className={styles.port_container}>
					<div className={styles.trade_type}>
						{TRADE_TYPE_MAPPING?.[tradeType]}
					</div>
					:
					<PortDetails
						details={DISPLAY_DATA_MAPPING[tradeType]}
					/>
				</div>
			) : (
				<>
					<div className={styles.port_content}>
						{t('myTickets:pol')}
						:
						<PortDetails
							details={originDetails}
							listLoading={listLoading}
						/>
					</div>
					<div className={styles.port_content}>
						{t('myTickets:pod')}
						:
						<PortDetails
							details={destinationDetails}
							listLoading={listLoading}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default ShipmentDetails;
