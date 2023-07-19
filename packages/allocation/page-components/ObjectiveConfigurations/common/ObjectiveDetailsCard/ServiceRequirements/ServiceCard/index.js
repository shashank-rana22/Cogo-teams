import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import CARD_DATA_MAPPING from './card-data-mapping';
import styles from './styles.module.css';

const FIRST_INDEX = 0;

function ServiceCard(props) {
	const { index, item, service_requirement_operator } = props;

	const {
		shipment_mode,
		service_type,
		trade_type,
	} = item;

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				{index !== FIRST_INDEX && (
					<Pill
						size="md"
						color="orange"
						className={styles.operator}
					>
						{(service_requirement_operator || '').toUpperCase()}
					</Pill>
				)}

				<h4 className={styles.heading}>
					{startCase(shipment_mode)}
					,
					{' '}
					{startCase(service_type || '')}
					,
					{' '}
					{startCase(trade_type || '')}
				</h4>
			</div>

			{CARD_DATA_MAPPING.map((value) => {
				const { accessor } = value;

				return accessor(item);
			})}
		</div>
	);
}

export default ServiceCard;
