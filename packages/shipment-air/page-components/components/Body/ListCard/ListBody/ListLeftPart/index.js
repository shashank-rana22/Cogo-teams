import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

const SERIAL_ID_LABEL = {
	consol       : 'CONSOL ID',
	coload       : 'COLOAD ID',
	defaultValue : 'SHIPMENT ID',
};

const INCLUDES_SHIPMENT = ['air_freight', 'domestic_air_freight'];

function ListLeftPart({ item = {} }) {
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
		<div className={styles.list_left_part}>
			<div className={styles.container}>
				<div>
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
					<p className={styles.business_name}>{business_name}</p>
				</Tooltip>
				{INCLUDES_SHIPMENT.includes(item?.shipment_type) && (
					<Tooltip
						theme="light"
						interactive
						content={<div>{airline_business_name}</div>}
					>
						<p className={styles.business_name}>
							<span>Airline:</span>
							{' '}
							{airline_business_name}
						</p>
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
export default ListLeftPart;
