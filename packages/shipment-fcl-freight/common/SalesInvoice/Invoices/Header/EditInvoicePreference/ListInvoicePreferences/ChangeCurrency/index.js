import { Pill } from '@cogoport/components';
import React from 'react';

import getCurrencyOptions from './helpers/getCurrencyOptions';

function ChangeCurrency({
	invoice = {},
	invoiceCurrency = '',
	setInvoiceCurreny = () => {},
}) {
	const { currencyOptions } = getCurrencyOptions(invoice);

	return (
		<div>
			<div style={{ marginBottom: '12px' }} className="change-currency-pills">
				<Pill
					options={currencyOptions}
					onChange={(val) => setInvoiceCurreny(val)}
					value={invoiceCurrency}
				/>
			</div>
		</div>
	);
}

export default ChangeCurrency;
