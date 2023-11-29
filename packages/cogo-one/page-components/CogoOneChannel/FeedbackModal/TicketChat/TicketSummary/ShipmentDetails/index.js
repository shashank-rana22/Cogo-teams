import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import {
	ID_TYPE_OPTIONS, QUERY_PATH,
	SINGLE_LOCATIONS, TRADE_TYPE_MAPPING,
} from '../../../../../../constants/shipmentConstants';
import { formatRouteData, handleRouteBooking, handleRouteSupply } from '../../../../../../utils/routeDataHelpers';

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
	updateShipmentData = {}, updateShipmentLoading = false, idType = '',
}) {
	const {
		shipment_type = '', trade_type: tradeType = '', id = '',
		origin_location = {}, destination_location = {},
	} = updateShipmentData || {};

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: updateShipmentData });

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};
	const shipmentType = ID_TYPE_OPTIONS?.includes(idType) ? service : shipment_type;

	const isSingleLocation = SINGLE_LOCATIONS?.includes(shipmentType);
	const defaultPol = isEmpty(origin_location) ? 'Destination' : 'Origin';
	const defaultData = isEmpty(origin_location) ? destination_location : origin_location;

	const ROUTE_PAGE_MAPPING = {
		missing_id : handleRouteSupply,
		dislike_id : handleRouteSupply,
		default    : handleRouteBooking,
	};

	if (!serialId) {
		return null;
	}

	return (
		<>
			<div
				role="presentation"
				className={styles.sid}
				onClick={(e) => (ROUTE_PAGE_MAPPING[idType] || ROUTE_PAGE_MAPPING?.default)?.({
					e,
					id,
					service,
					partnerId,
					endPoint: QUERY_PATH?.[idType],
					serialId,
				})}
			>
				{t('myTickets:sid')}
				:
				<span className={styles.number}>
					{serialId}
				</span>
			</div>
			{isSingleLocation ? (
				<div className={styles.port_container}>
					<div className={styles.trade_type}>
						{TRADE_TYPE_MAPPING?.[tradeType] || defaultPol}
					</div>
					:
					<PortDetails
						details={DISPLAY_DATA_MAPPING[tradeType] || defaultData}
					/>
				</div>
			) : (
				<>
					<div className={styles.port_content}>
						{t('myTickets:pol')}
						:
						<PortDetails
							details={originDetails}
							listLoading={updateShipmentLoading}
						/>
					</div>
					<div className={styles.port_content}>
						{t('myTickets:pod')}
						:
						<PortDetails
							details={destinationDetails}
							listLoading={updateShipmentLoading}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default ShipmentDetails;
