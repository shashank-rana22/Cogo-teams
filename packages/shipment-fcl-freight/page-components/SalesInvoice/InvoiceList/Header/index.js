import { cl, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
// import { useSelector } from '@cogo/store';
// import { Flex } from '@cogoport/front/components';
import React, { useRef, useEffect } from 'react';

// import handleTimer from '../../../../../utils/handleTimer';
// import ExchangeRate from '../../../ExchangeRate/index';

import EditInvoicePreference from './EditInvoicePreference';
import styles from './styles.module.css';
import UpdateQuotation from './UpdateQuotation';

function Header({
	invoiceData = {},
	isCustomer = false,
	refetch = () => {},
	disableAction = false,
	shipment_data = {},
}) {
	// const user_data = useSelector(({ profile }) => profile || {});

	const {
		net_total_price_discounted,
		net_total_price_currency,
		invoicing_parties,
		reviewed_invoices,
		invoice_trigger_date,
	} = invoiceData;

	const timerRef = useRef(null);
	const time = null;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		time = handleTimer(invoice_trigger_date);

	// 		if (time) {
	// 			timerRef.current.innerText = time;
	// 		}
	// 	}, 1000);

	// 	if (!invoice_trigger_date) {
	// 		return () => clearInterval(interval);
	// 	}
	// 	return () => clearInterval(interval);
	// }, []);

	// const showExchangeRate =		(invoicing_parties || []).some(
	// 	(ip) => !['liners_exchange_rate', 'eta', 'etd'].includes(
	// 		ip?.exchange_rate_state,
	// 	) && shipment_data?.serial_id < '138811',
	// ) || user_data.email === 'ajeet@cogoport.com';

	return (
		<div className={styles.container}>
			<div className={styles.FlexRow}>
				<div className={styles.total_shipment_title}>Total Shipment Value -</div>

				<div className={styles.ShipmentValue}>
					{formatAmount({
						amount   : net_total_price_discounted,
						currency : net_total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={styles.EditInvoice}>
				{!isCustomer ? (
					<div className={styles.ReviwedStats}>
						{reviewed_invoices ?? 0}
						{' '}
						of
						{' '}
						{invoicing_parties?.length ?? 1}
						{' '}
						reviewed
					</div>
				) : null}

				<div className={styles.Flex}>
					{/* {showExchangeRate ? (
						<ExchangeRate
							shipment_id={shipment_data.id}
							refetch={refetch}
							invoiceData={invoiceData}
							shipment_data={shipment_data}
							disableAction={disableAction}
						/>
					) : null} */}

					<EditInvoicePreference
						shipment_data={shipment_data}
						invoicing_parties={invoicing_parties}
						refetch={refetch}
						disableAction={disableAction}
					/>

					<UpdateQuotation shipment_data={shipment_data} refetch={refetch} />
				</div>
			</div>
		</div>
	);
}

export default Header;
