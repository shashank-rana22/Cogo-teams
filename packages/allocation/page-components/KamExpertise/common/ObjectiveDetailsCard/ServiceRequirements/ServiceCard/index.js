import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import SERVICE_DETAILS_MAPPING from './service-details-mapping';
import styles from './styles.module.css';

function ServiceCard(props) {
	const {
		index,
		item = {},
		operator = 'AND',
	} = props;

	const {
		shipment_mode = '',
		service_type = '',
		trade_type = '',
	} = item;

	return (
		<div className={styles.container}>
			<div className={styles.key_value_container}>
				{index !== GLOBAL_CONSTANTS.zeroth_index && (
					<Pill
						size="md"
						color="orange"
						className={styles.operator}
					>
						{(operator || '').toUpperCase()}
					</Pill>
				)}
				<div className={styles.sub_title}>
					{startCase(shipment_mode) || '--'}
					,
					{' '}
					{startCase(service_type)}
					,
					{' '}
					{startCase(trade_type)}
				</div>
			</div>

			{SERVICE_DETAILS_MAPPING.map((value) => {
				const { accessor } = value;

				return accessor(item);
			})}
		</div>
	);
}

export default ServiceCard;
