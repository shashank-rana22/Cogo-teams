import { Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const FIRST_INDEX = 0;

function ServiceCard(props) {
	const { index, item, operator } = props;

	const { shipment_mode, service_type, trade_type, inco_term } = item;

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				{index !== FIRST_INDEX && (
					<Pill
						size="md"
						color="orange"
						className={styles.operator}
					>
						{(operator || '').toUpperCase()}
					</Pill>
				)}

				<h4 className={styles.heading}>
					{startCase(shipment_mode)}
					,
					{' '}
					{startCase(service_type)}
					,
					{' '}
					{startCase(trade_type || '')}
				</h4>
			</div>

			<div className={styles.key_value_container}>
				<div className={styles.label}>
					Incoterm:
				</div>
				{!isEmpty(inco_term) && (
					<div className={styles.value_container}>
						{inco_term.map((value) => ` ${value.toUpperCase()},`)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ServiceCard;
