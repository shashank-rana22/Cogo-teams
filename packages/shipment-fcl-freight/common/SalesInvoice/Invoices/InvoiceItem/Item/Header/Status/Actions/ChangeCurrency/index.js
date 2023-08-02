import { Button, Modal, Select } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useUpdateCurrency from '../../../../../../../../../hooks/useUpdateCurrency';

import styles from './styles.module.css';

function ChangeCurrency({
	isChangeCurrency = false,
	setIsChangeCurrency = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const geo = getGeoConstants();

	const { id, shipment_id, invoice_currency, country_code } = invoice || {};

	const [value, setValue] = useState(invoice_currency);

	const currencyOptionsOld = GLOBAL_CONSTANTS.options.freight_invoice_currency?.[
		country_code || geo.country.currency.code
	] || GLOBAL_CONSTANTS.options.freight_invoice_currency.OTHERS;

	const currencyOptions = currencyOptionsOld.map((item) => ({
		label : item,
		value : item,
	}));

	const isCurrencyChanged = value !== invoice_currency;

	const onClose = () => setIsChangeCurrency(false);

	const refetchAfterCall = () => {
		onClose();
		refetch();
	};

	const { onCreate, loading } = useUpdateCurrency({
		refetch  : refetchAfterCall,
		currency : invoice_currency,
	});

	return (
		<Modal
			className={styles.form}
			show={isChangeCurrency}
			closeOnOuterClick={false}
			onClose={onClose}
		>
			<Modal.Header title="CHANGE CURRENCY" />

			<Modal.Body>
				<label>Select Currency</label>
				<Select
					value={value}
					onChange={setValue}
					placeholder="Select Currency"
					options={currencyOptions}
					className={styles.select_div}
					size="sm"
				/>
			</Modal.Body>

			<Modal.Footer className={styles.button_div}>
				<Button
					themeType="secondary"
					onClick={() => setIsChangeCurrency(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					onClick={() => onCreate({
						id,
						invoice_currency: value,
						shipment_id,
					})}
					disabled={loading || !isCurrencyChanged}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeCurrency;
