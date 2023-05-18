import { Chips } from '@cogoport/components';
import React from 'react';

import getCurrencyOptions from './helpers/getCurrencyOptions';
import styles from './styles.module.css';

function ChangeCurrency({
	invoice = {},
	invoiceCurrency = '',
	setInvoiceCurrency = () => {},
}) {
	const { currencyOptions } = getCurrencyOptions(invoice);

	return (
		<Chips
			className={styles.chip}
			size="sm"
			items={currencyOptions}
			selectedItems={invoiceCurrency}
			onItemChange={(val) => setInvoiceCurrency(val)}
			style={{ width: '10px' }}
		/>
	);
}

export default ChangeCurrency;
