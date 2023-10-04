import React from 'react';

import InvoiceDetailsTimeLine from './InvoiceDetailsTimeLine';
import Remarks from './Remarks';
import styles from './styles.module.css';

export function RenderAction({ itemData = {}, activeTab = '', refetch = () => {} }) {
	const checkRelease = ['disputed'].includes(activeTab);

	return (
		<div className={styles.flex}>
			<Remarks itemData={itemData} checkRelease={checkRelease} refetch={refetch} />

			{!checkRelease ? <InvoiceDetailsTimeLine item={itemData} /> : null}

		</div>
	);
}
