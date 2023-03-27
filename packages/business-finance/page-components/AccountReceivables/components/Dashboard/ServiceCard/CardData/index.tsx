import { getFormattedPrice } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CardData({ tab }) {
	return (
		<div className={styles.container}>
			<div className={styles.key_container}>{tab?.key}</div>
			<div className={styles.sub_container}>
				{
				(tab?.data || [{}]).map((item) => (
					<div className={tab?.key === 'Air' ? styles.air_container : styles.item_container}>
						<div className={styles.name}>{startCase(item?.name)}</div>
						<div>
							{getFormattedPrice(
								item?.openInvoiceAmount,
								item?.currency,
							) }

						</div>
					</div>
				))
			}
			</div>

		</div>
	);
}
export default CardData;
