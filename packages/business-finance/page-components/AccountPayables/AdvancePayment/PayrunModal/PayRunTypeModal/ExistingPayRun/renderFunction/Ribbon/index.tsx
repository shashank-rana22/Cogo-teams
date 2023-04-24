import React from 'react';

import styles from './styles.module.css';

function Ribbon({ itemData }) {
	const { type } = itemData || {};
	return (
		<div>
			{type === 'ADVANCE_PAYMENT' && (
				<div className={styles.ribbons}>
					<div className={styles.ribbon}>Adv.Payment</div>
				</div>
			)}
		</div>
	);
}

export default Ribbon;
