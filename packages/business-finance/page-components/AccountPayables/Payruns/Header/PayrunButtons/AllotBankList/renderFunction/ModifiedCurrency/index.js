import React from 'react';

import styles from './styles.module.css';

function ModifiedCurrency({ itemData = {}, selectedPayrun = {}, checkedRow = null }) {
	const { totalValue } = selectedPayrun || checkedRow || {};
	const { balance, currency } = itemData || {};
	return <div>{balance < totalValue ? <div className={styles.text}>{currency}</div> : currency}</div>;
}

export default ModifiedCurrency;
