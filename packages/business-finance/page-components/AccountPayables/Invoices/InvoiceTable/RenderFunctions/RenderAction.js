import React from 'react';

import InvoiceDetailsTimeLine from './InvoiceDetailsTimeLine';
import Remarks from './Remarks';
import styles from './styles.module.css';

const POSSIBLE_ACTIVE_TAB = ['disputed'];

export function RenderAction({ itemData = {}, activeTab = '', refetch = () => {}, hideIcDot = false }) {
	const checkRelease = POSSIBLE_ACTIVE_TAB.includes(activeTab);

	return (
		<div className={styles.flex}>
			<Remarks itemData={itemData} checkRelease={checkRelease} refetch={refetch} hideIcDot={hideIcDot} />

			{!checkRelease ? <InvoiceDetailsTimeLine item={itemData} /> : null}

		</div>
	);
}
