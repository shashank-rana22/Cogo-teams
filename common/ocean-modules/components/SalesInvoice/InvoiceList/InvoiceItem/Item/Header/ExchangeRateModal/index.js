// import CardList from '@cogo/bookings/commons/CardList';
// import useGetExchangeRate from '@cogo/bookings/Invoicing/hooks/useGetExchangeRate';
import { Modal, Input } from '@cogoport/components';
import React, { useState } from 'react';

// import fields from './fields';

function ExchangeRateModal({
	showExchangeRate = false,
	setExchangeRate = () => {},
	invoice = {},
}) {
	// const { loading, exchangerateData } = useGetExchangeRate({ invoice });
	const [q, setQ] = useState('');
	// const { source_currencies = {} } = exchangerateData || {};

	// const currencyArray = Object.keys(source_currencies).map((item) => ({
	// 	currency      : item,
	// 	exchange_rate : source_currencies[item],
	// }));

	// let list = currencyArray;

	// if (q) {
	// 	list = currencyArray.filter((item) => item?.currency === q.toUpperCase());
	// }

	return (
		<Modal
			show={showExchangeRate}
			onClose={() => setExchangeRate(false)}
			className="primary sm"
			// loading={loading}
		>
			<Modal.Header title="Exchange Rates of invoice.invoice_currency" />
			<Modal.Body>
				<Input
					name="q"
					placeholder="Search Currency Code"
					value={q}
					onChange={(e) => setQ(e.target?.value)}
					style={{ width: '300px' }}
					className="primary sm"
				/>
				{/* <CardList fields={fields} data={list} loading={loading} /> */}

			</Modal.Body>
		</Modal>
	);
}

export default ExchangeRateModal;
