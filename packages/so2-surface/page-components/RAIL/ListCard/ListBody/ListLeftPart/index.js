import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function ListLeftPart({ item = {} }) {
	const {
		serial_id = '',
		booking_party_details = {},
		entity_manager = {},
		booking_agent = {},
	} = item;

	const { company_name = '' } = booking_party_details;

	return (
		<div className={styles.list_left_part}>
			<div className={styles.container}>
				<div>
					SHIPMENT ID :
					{' '}
					{serial_id || ''}
				</div>
				<Tooltip
					theme="light"
					interactive
					content={(
						<div>
							{company_name}
						</div>
					)}
				>
					<p className={styles.business_name}>{company_name}</p>
				</Tooltip>

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
