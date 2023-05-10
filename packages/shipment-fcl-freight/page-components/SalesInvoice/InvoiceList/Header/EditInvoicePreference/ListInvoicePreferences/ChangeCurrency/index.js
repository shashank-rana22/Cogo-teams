import { Flex, Pills } from '@cogoport/components';
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
			<Flex marginBottom="12px" className="change-currency-pills">
				<Pills
					options={currencyOptions}
					onChange={(val) => setInvoiceCurreny(val)}
					value={invoiceCurrency}
				/>
			</Flex>
		</div>
	);
}

export default ChangeCurrency;
