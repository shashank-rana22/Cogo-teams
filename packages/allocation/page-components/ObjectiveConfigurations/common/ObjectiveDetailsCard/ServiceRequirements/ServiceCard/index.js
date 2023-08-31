import { Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getCardDataMapping from './card-data-mapping';
import styles from './styles.module.css';

const FIRST_INDEX = 0;

function ServiceCard(props) {
	const { t } = useTranslation(['allocation']);

	const { index, item, service_requirement_operator } = props;

	const cardDataMapping = getCardDataMapping({ t });

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
					{!isEmpty(service_type) ? `, ${startCase(service_type)}` : ''}
					{!isEmpty(trade_type) ? `, ${startCase(trade_type)}` : ''}
				</h4>
			</div>

			{(cardDataMapping || []).map((value) => {
				const { accessor } = value;

				return accessor(item);
			})}
		</div>
	);
}

export default ServiceCard;
