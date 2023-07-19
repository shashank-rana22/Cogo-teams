import React from 'react';

import styles from './styles.module.css';

function ModifiedCurrency({ itemData = {}, selectedPayrun = {}, checkedRow = null }) {
	const { totalValue } = selectedPayrun || checkedRow || {};
	const { balance, currency } = itemData || {};
	return (
		<div className={balance < totalValue ? styles.text : ''}>{currency}</div>
	);
}

export default ModifiedCurrency;
