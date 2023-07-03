import React from 'react';

import InvoiceDetailsTimeLine from './InvoiceDetailsTimeLine';
import Remarks from './Remarks';
import styles from './styles.module.css';

export function RenderAction({ itemData }) {
	return (
		<div className={styles.flex}>
			<Remarks itemData={itemData} />
			<InvoiceDetailsTimeLine item={itemData} />
		</div>
	);
}
