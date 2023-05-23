import { Button, Modal, Select } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateCurrency from '../../../../../../../hooks/useUpdateCurrency';
import INVOICE_CURRENCY_MAPPINGS from '../../../../../helpers/invoiceCurrencyMapping';

import styles from './styles.module.css';

function ChangeCurrency({
	isChangeCurrency = false,
	setIsChangeCurrency = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const onClose = () => {
		setIsChangeCurrency(false);
	};
	const [value, setValue] = useState('');

	const geo = getGeoConstants();

	const currencyOptionsOld =	INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.[
		invoice?.country_code || geo.country.currency.code
	] || INVOICE_CURRENCY_MAPPINGS?.freight_invoice_currency?.others;

	const currencyOptions = currencyOptionsOld.map((item) => ({
		label : item,
		value : item,
	}));

	const payload = {
		id               : invoice?.id,
		invoice_currency : value,
		shipment_id      : invoice.shipment_id,
	};

	const refetchAfterCall = () => {
		if (onClose) {
			onClose();
		}
		refetch();
	};

	const { onCreate, loading } = useUpdateCurrency({
		refetch  : refetchAfterCall,
		currency : invoice?.invoice_currency,
	});

	return (
		<Modal
			className={styles.form}
			show={isChangeCurrency}
			closeOnOuterClick={false}
		>
			<Modal.Header title="CHANGE CURRENCY" />
			<Modal.Body>
				<div>Select Currency</div>
				<Select
					value={value}
					onChange={setValue}
					placeholder="Select Currency"
					options={currencyOptions}
					size="md"
					className={styles.select_div}
				/>
			</Modal.Body>
			<Modal.Footer className={styles.button_div}>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => setIsChangeCurrency(false)}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={() => onCreate(payload)}
					disabled={loading || isEmpty(value)}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeCurrency;
