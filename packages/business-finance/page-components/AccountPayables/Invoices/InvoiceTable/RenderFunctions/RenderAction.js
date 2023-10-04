import React from 'react';

import InvoiceDetailsTimeLine from './InvoiceDetailsTimeLine';
import Remarks from './Remarks';
import styles from './styles.module.css';

export function RenderAction({ itemData = {}, activeTab = '', refetch = () => {}, hideIcDot = false }) {
	const checkRelease = ['disputed'].includes(activeTab);

	return (
		<div className={styles.flex}>
			<Remarks itemData={itemData} checkRelease={checkRelease} refetch={refetch} hideIcDot={hideIcDot} />

			{!checkRelease ? <InvoiceDetailsTimeLine item={itemData} /> : null}

		</div>
	);
}
