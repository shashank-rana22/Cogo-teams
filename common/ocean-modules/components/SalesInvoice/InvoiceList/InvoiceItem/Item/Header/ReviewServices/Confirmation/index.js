import { Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Confirmation({ value = false, setValue = () => {} }) {
	return (
		<div className={styles.Container}>
			<div className={styles.CheckBoxWrapper}>
				<Checkbox
					value={value}
					onChange={() => setValue(!value)}
				/>
			</div>

			<div
				role="button"
				tabIndex={0}
				className={styles.ConfirmLabel}
				onClick={() => setValue(!value)}
			>
				I have verified the invoice and ensured that all the services taken &
				charges incurred during the shipment have been billed to the customer
			</div>
		</div>
	);
}

export default Confirmation;
