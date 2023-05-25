import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import CurrencyExchangeForm from './ExchangeRateForm/CurrencyExchangeForm';
import Helper from './helper';
import styles from './styles.module.css';

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];

function ExchangeRate({
	shipment_data,
	shipment_id,
	refetch = () => {},
	invoiceData = {},
	disableAction = false,
	currencyConversionData = {},
	quotationData = {},
}) {
	const [open, setOpen] = useState(false);

	const invoiceCurrency = invoiceData?.invoicing_parties?.[0]?.invoice_currency;

	const {
		rateAddtionApi,
		differentCurrenciesHash,
		availableCurrencyConversions,
	} = Helper({ quotationData, currencyConversionData, invoiceCurrency });

	// if (Object.keys(differentCurrenciesHash || {}).length === 0) {
	// 	return null;
	// }

	const disableStateInvoices = invoiceData?.invoicing_parties?.every((item) => INVOICE_STATUS.includes(item?.status));
	const disableBtn = disableAction || disableStateInvoices;

	return (
		<div>
			<Button
				size="sm"
				onClick={() => setOpen(true)}
				disabled={disableAction}
				themeType="secondary"
				className={styles.ModifyButton}
			>
				Exchange Rate
			</Button>

			{open ? (
				<CurrencyExchangeForm
					invoiceCurrency={invoiceCurrency}
					differentCurrenciesHash={differentCurrenciesHash}
					rateAddtionApi={rateAddtionApi}
					setOpen={setOpen}
					shipment_id={shipment_id}
					availableCurrencyConversions={availableCurrencyConversions}
					refetch={refetch}
					open={open}
				/>
			) : null}
		</div>
	);
}

export default ExchangeRate;
