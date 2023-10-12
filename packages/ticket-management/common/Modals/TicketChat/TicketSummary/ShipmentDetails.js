import { Placeholder } from '@cogoport/components';

import { SINGLE_LOCATIONS } from '../../../../constants';
import { formatRouteData } from '../../../../utils/routeDataHelpers';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	sid        : 'myTickets:sid',
	missing_id : 'myTickets:missing',
	dislike_id : 'myTickets:dislike',
};

const TRADE_TYPE_MAPPING = {
	import : 'Origin',
	export : 'Destination',
};

const QUERY_PATH = {
	missing_id : 'trade-enquiry',
	dislike_id : 'disliked-rates',
	sid        : undefined,
};

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
	idType = '', serialId = 0, t = () => {},
	handleRouteBooking = () => {}, service = '', partnerId = '',
	shipmentsData = {}, handleRouteSupply = () => {}, listLoading = false,
}) {
	const { shipment_type = '', trade_type: tradeType = '', id = '' } = shipmentsData || {};

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: shipmentsData });

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	const ROUTE_PAGE_MAPPING = {
		sid        : handleRouteBooking,
		missing_id : handleRouteSupply,
		dislike_id : handleRouteSupply,
		default    : handleRouteBooking,
	};

	const isSingleLocation = SINGLE_LOCATIONS?.includes(shipment_type);

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
				})}
			>
				{t(LABEL_MAPPING[idType] || LABEL_MAPPING.sid)}
				:
				<span className={styles.number}>
					{serialId}
				</span>
			</div>
			{isSingleLocation ? (
				<div className={styles.port_container}>
					<div className={styles.trade_type}>
						{TRADE_TYPE_MAPPING[tradeType]}
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
