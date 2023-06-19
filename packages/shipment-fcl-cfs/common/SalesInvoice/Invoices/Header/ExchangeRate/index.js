import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import CurrencyExchangeForm from './ExchangeRateForm/CurrencyExchangeForm';
import styles from './styles.module.css';
import useHelper from './useHelper';

const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];

const EMPTY_VALUE = 0;

function ExchangeRate({
	shipment_id,
	refetch = () => {},
	invoiceData = {},
	disableAction = false,
}) {
	const [open, setOpen] = useState(false);

	const invoiceCurrency = invoiceData?.invoicing_parties?.[GLOBAL_CONSTANTS.zeroth_index]?.invoice_currency;

	const refetchAfterApiCall = () => {
		refetch();
		setOpen(false);
	};

	const {
		handleFormSubmit,
		differentCurrenciesHash,
		availableCurrencyConversions,
		loading,
	} = useHelper({ invoiceCurrency, refetch: refetchAfterApiCall, shipment_id });

	if (Object.keys(differentCurrenciesHash || {}).length === EMPTY_VALUE) {
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
					differentCurrenciesHash={differentCurrenciesHash}
					handleFormSubmit={handleFormSubmit}
					setOpen={setOpen}
					shipment_id={shipment_id}
					availableCurrencyConversions={availableCurrencyConversions}
					open={open}
					loading={loading}
				/>
			) : null}
		</div>
	);
}

export default ExchangeRate;
