import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import CurrencyExchangeForm from './ExchangeRateForm/CurrencyExchangeForm';
import useExchangeRate from './useExchangeRate';

function ExchangeRate({
	shipment_data,
	BfInvoiceRefetch = () => {},
	invoiceData = {},
	disableAction = false,
}) {
	const [open, setOpen] = useState(false);

	const invoiceCurrency = invoiceData?.invoicing_parties?.[0]?.invoice_currency;

	const {
		rateAddtionApi,
		differentCurrenciesHash,
		availableCurrencyConversions,
	} = useExchangeRate({ shipment_id: shipment_data.id, invoiceCurrency });

	if (Object.keys(differentCurrenciesHash || {}).length === 0) {
		return null;
	}

	const disableStateInvoices = invoiceData?.invoicing_parties?.every(
		(item) => ['reviewed', 'approved', 'revoked'].includes(item?.status),
	);

	let disableBtn = disableAction || disableStateInvoices;

	if (
		shipment_data?.shipment_type === 'ltl_freight'
		&& shipment_data?.all_services?.[0]?.payment_term === 'prepaid'
	) disableBtn = true;

	return (
		<div>
			<Button
				disabled={disableBtn}
				onClick={() => setOpen(true)}
				size="sm"
			>
				Exchange Rate
			</Button>

			{open ? (
				<Modal
					show={open}
					onClose={() => setOpen(false)}
					closable={false}
					className="primary md"
				>
					<CurrencyExchangeForm
						invoiceCurrency={invoiceCurrency}
						differentCurrenciesHash={differentCurrenciesHash}
						rateAddtionApi={rateAddtionApi}
						setOpen={setOpen}
						shipment_id={shipment_data.id}
						availableCurrencyConversions={availableCurrencyConversions}
						BfInvoiceRefetch={BfInvoiceRefetch}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default ExchangeRate;
