import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

import styles from './styles.module.css';

function ShipmentDetails({ data = {} }) {
	const unit = 'Cont.';

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.priceText}>
					{getFormattedPrice('en-IN', data?.freight_total, data?.freight_currency)}

					<div className={styles.sub}>
						/
						{unit}
					</div>
				</div>
			</div>
			<div className={styles.box}>
				{'MBL\'s'}
				{' '}
				-
				{data?.bls_count}
			</div>
		</div>
	);
}

export default ShipmentDetails;
