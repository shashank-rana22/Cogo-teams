import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	origin              : 'Origin Services',
	destination         : 'Destination Services',
	main_service        : 'Main Service',
	other_services      : 'Other Services',
	subsidiary_services : 'Selected Subsidiary Services',
};

function ListHeader({ type = '', currency = '', totalPrice = 0 }) {
	return (
		<div className={styles.header}>
			<span className={styles.type_label}>{LABEL_MAPPING[type] || startCase(type)}</span>

			{type !== 'main_service' ? (
				<div className={styles.total_price}>
					<span className={styles.cost_label}>Total landed Cost:</span>
					{' '}
					<strong>
						{totalPrice ? formatAmount({
							amount  : totalPrice,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						}) : 'NA'}
					</strong>
				</div>
			) : null}
		</div>
	);
}

export default ListHeader;
