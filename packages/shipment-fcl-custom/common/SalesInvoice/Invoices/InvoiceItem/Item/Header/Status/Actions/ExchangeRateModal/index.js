import { Modal, Input, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useGetAllExchangeRates from '../../../../../../../../../hooks/useGetAllExchangeRates';
import CardList from '../../../../../../../commons/CardList';

import fields from './fields';
import styles from './styles.module.css';

function ExchangeRateModal({
	setExchangeRate = () => {},
	invoice = {},
}) {
	const { loading, data } = useGetAllExchangeRates({
		defaultParams: {
			base_currency   : invoice?.invoice_currency,
			organization_id : invoice?.billing_address?.organization_id,
		},
	});

	const [q, setQ] = useState('');
	const { source_currencies = {} } = data || {};

	const currencyArray = Object.keys(source_currencies).map((item) => ({
		currency      : item,
		exchange_rate : source_currencies[item],
	}));

	let list = currencyArray;

	if (q) {
		list = currencyArray.filter((item) => item?.currency.includes(q.toUpperCase()));
	}

	const onClose = () => {
		setExchangeRate(false);
	};

	return (
		<Modal
			show
			onClose={onClose}
			loading={loading}
			showCloseIcon={false}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title={`Exchange Rates of ${invoice.invoice_currency}`} />
			<Modal.Body>
				<Input
					name="q"
					placeholder="Search Currency Code"
					value={q}
					onChange={(e) => setQ(e)}
					size="sm"
				/>
				<CardList fields={fields} data={list} loading={loading} />
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ExchangeRateModal;
