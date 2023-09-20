import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import CARD_DATA_MAPPING from './card-data-mapping';
import styles from './styles.module.css';

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
				{index !== GLOBAL_CONSTANTS.zeroth_index && (
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

					{!isEmpty(service_type) ? ` ,${startCase(service_type)}` : ''}

					{!isEmpty(trade_type) ? ` ,${startCase(trade_type)}` : ''}
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
