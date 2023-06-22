import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

const SERIAL_ID_LABEL = {
	consol       : 'Consol ID',
	coload       : 'Coload ID',
	defaultValue : 'Shipment ID',
};

const INCLUDES_SHIPMENT = ['air_freight', 'domestic_air_freight'];

function ShipmentDetails({ item = {} }) {
	const {
		serial_id = '',
		source = '',
		importer_exporter = {},
		entity_manager = {},
		booking_agent = {},
		airline = {},
	} = item;

	const { business_name = '' } = importer_exporter;

	const { business_name:airline_business_name = '' } = airline || {};

	return (
		<div className={styles.shipment_details_container}>
			<div className={styles.container}>
				<div className={styles.serial_id}>
					{SERIAL_ID_LABEL[source] || SERIAL_ID_LABEL.defaultValue}
					{' '}
					#
					{serial_id || ''}
				</div>
				<Tooltip
					theme="light"
					interactive
					content={(
						<div>
							{business_name}
						</div>
					)}
				>
					<div className={styles.business_name}>{business_name}</div>
				</Tooltip>
				{INCLUDES_SHIPMENT.includes(item?.shipment_type) && (
					<Tooltip
						theme="light"
						interactive
						content={<div>{airline_business_name}</div>}
					>
						<div className={styles.business_name}>
							<span>Airline:</span>
							{' '}
							{airline_business_name}
						</div>
					</Tooltip>
				)}
				<div className={styles.agent_name}>
					KAM :
					{' '}
					{entity_manager?.name || booking_agent?.name}
				</div>
			</div>
			<div className={styles.line} />
		</div>
	);
}
export default ShipmentDetails;
