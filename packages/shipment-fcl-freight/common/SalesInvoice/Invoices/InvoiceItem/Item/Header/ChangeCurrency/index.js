import { Button, Modal, Select } from '@cogoport/components';
import React, { useState } from 'react';
import useUpdateCurrency from '../../../../../Hooks/useUpdateCurrency';
import styles from './styles.module.css';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

function ChangeCurrency({
	isChangeCurrency = false,
	setIsChangeCurrency = () => {},
	invoice = {},
	refetch = () => {},
	isIE = false,
}) {
	const onClose = () => {
		setIsChangeCurrency(false);
	};
	const [value, setValue] = useState('');

	const geo = getGeoConstants();
const currency = GLOBAL_CONSTANTS.currency_code;
const country = GLOBAL_CONSTANTS.country_ids;

const country_code = (id) => {
	const details = getCountryDetails({
		country_id: id,
	});
	return details.country_code;
};

const invoiceCurrencyMappings = {
	freight_invoice_currency: {
		[country_code(country.IN)]: [currency.INR, currency.USD],
		[country_code(country.GB)]: [currency.GBP, currency.EUR, currency.USD],
		[country_code(country.VN)]: [currency.USD, currency.VND],
		others: [currency.USD, currency.EUR, currency.INR],
	},
};

	const currencyOptionsOld =
	invoiceCurrencyMappings?.freight_invoice_currency?.[
		invoice?.country_code || geo.country.currency.code
	] || invoiceCurrencyMappings?.freight_invoice_currency?.others;

	const currencyOptions = currencyOptionsOld.map((item) => ({
	label: item,
	value: item,
}));

	const payload = {
		id: invoice?.id,
		invoice_currency: value,
		shipment_id: invoice.shipment_id,
	};

	const refetchAfterCall = () => {
		if (onClose) {
			onClose();
		}
		refetch();

	}

	const { onCreate, loading } = useUpdateCurrency({payload, refetch: refetchAfterCall, currency: invoice?.invoice_currency});

	return (
		<Modal
		className={styles.form}
			show={isChangeCurrency}
			onClose={onClose}
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
						style={{ width: '250px' }}
					/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					onClick={() => setIsChangeCurrency(false)}
							disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					style={{ marginLeft: '16px' }}
					onClick={onCreate}
					disabled={loading}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ChangeCurrency;
