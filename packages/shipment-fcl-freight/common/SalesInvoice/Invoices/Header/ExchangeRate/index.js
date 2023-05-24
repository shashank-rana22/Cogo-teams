import { Modal } from '@cogoport/components';
import React, { useState } from 'react';

import CurrencyExchangeForm from './ExchangeRateForm/CurrencyExchangeForm';
import styles from './styles.module.css';
// import useGetShipmentQuotation from './useGetShipmentQuotation';

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];

function ExchangeRate({
	shipment_data,
	shipment_id,
	refetch = () => {},
	invoiceData = {},
	disableAction = false,
}) {
	const [open, setOpen] = useState(false);

	const invoiceCurrency = invoiceData?.invoicing_parties?.[0]?.invoice_currency;

	// const {
	// 	rateAddtionApi,
	// 	differentCurrenciesHash,
	// 	availableCurrencyConversions,
	// } = useGetShipmentQuotation({ shipment_id, invoiceCurrency });

	// if (Object.keys(differentCurrenciesHash || {}).length === 0) {
	// 	return null;
	// }

	const disableStateInvoices = invoiceData?.invoicing_parties?.every((item) => INVOICE_STATUS.includes(item?.status));
	const disableBtn = disableAction || disableStateInvoices;

	return (
		<div>
			<div
				disabled={disableBtn}
				onClick={() => setOpen(true)}
				className={styles.ModifyButton}
				role="button"
				tabIndex={0}
			>
				Exchange Rate
			</div>

			{open ? (
				<Modal
					show={open}
					onClose={() => setOpen(false)}
					size="md"
				>
					<CurrencyExchangeForm
						invoiceCurrency={invoiceCurrency}
						// differentCurrenciesHash={differentCurrenciesHash}
						// rateAddtionApi={rateAddtionApi}
						setOpen={setOpen}
						shipment_id={shipment_id}
						// availableCurrencyConversions={availableCurrencyConversions}
						refetch={refetch}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default ExchangeRate;
