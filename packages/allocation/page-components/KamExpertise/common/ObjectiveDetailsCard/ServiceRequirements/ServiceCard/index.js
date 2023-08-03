import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import SERVICE_DETAILS_MAPPING from './service-details-mapping';
import styles from './styles.module.css';

const FIRST_INDEX = 0;

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
				{index !== FIRST_INDEX && (
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
