import { Button } from '@cogoport/components';
import { useState } from 'react';

import CurrencyExchangeForm from './ExchangeRateForm/CurrencyExchangeForm';
import styles from './styles.module.css';
import useHelper from './useHelper';

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];
const INITIAL_STATE = 0;

function ExchangeRate({
	shipment_id,
	refetch = () => {},
	invoiceData = {},
	disableAction = false,
}) {
	const [open, setOpen] = useState(false);

	const invoiceCurrency = invoiceData?.invoicing_parties?.[INITIAL_STATE]?.invoice_currency;

	const refetchAfterApiCall = () => {
		refetch();
		setOpen(false);
	};

	const {
		handleFormSubmit,
		DIFFERENT_CURRENCIES_HASH,
		AVAILABLE_CURRENCY_CONVERSION,
		loading,
	} = useHelper({ invoiceCurrency, refetch: refetchAfterApiCall, shipment_id });

	if (Object.keys(DIFFERENT_CURRENCIES_HASH || {}).length === INITIAL_STATE) {
		return null;
	}

	const disableStateInvoices = invoiceData?.invoicing_parties?.every((item) => INVOICE_STATUS.includes(item?.status));
	const disableBtn = disableAction || disableStateInvoices;

	return (
		<div>
			<Button
				size="sm"
				onClick={() => setOpen(true)}
				disabled={disableBtn}
				themeType="secondary"
				className={styles.modify_button}
			>
				Exchange Rate
			</Button>

			{open ? (
				<CurrencyExchangeForm
					invoiceCurrency={invoiceCurrency}
					DIFFERENT_CURRENCIES_HASH={DIFFERENT_CURRENCIES_HASH}
					handleFormSubmit={handleFormSubmit}
					setOpen={setOpen}
					shipment_id={shipment_id}
					AVAILABLE_CURRENCY_CONVERSION={AVAILABLE_CURRENCY_CONVERSION}
					open={open}
					loading={loading}
				/>
			) : null}
		</div>
	);
}

export default ExchangeRate;
