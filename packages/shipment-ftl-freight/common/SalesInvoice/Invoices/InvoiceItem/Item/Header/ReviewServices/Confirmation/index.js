import { Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Confirmation({ value = false, setValue = () => {} }) {
	return (
		<div
			role="button"
			tabIndex={0}
			className={styles.container}
			onClick={() => setValue(!value)}
		>
			<Checkbox checked={value} />

			<div className={styles.confirm_label}>
				I have verified the invoice and ensured that all the services taken &
				charges incurred during the shipment have been billed to the customer
			</div>
		</div>
	);
}

export default Confirmation;
