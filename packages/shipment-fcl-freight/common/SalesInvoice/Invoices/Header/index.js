import { ShipmentDetailContext } from '@cogoport/context';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import React, { useContext } from 'react';

import ExchangeRate from '../../ExchangeRate';

import EditInvoicePreference from './EditInvoicePreference';
import styles from './styles.module.css';
import UpdateQuotation from './UpdateQuotation';

function Header({
	invoiceData = {},
	refetch = () => {},
	disableAction = false,
	isCustomer = false,
}) {
	const user_data = useSelector(({ profile }) => profile || {});

	const { shipment_data } = useContext(ShipmentDetailContext);

	const {
		net_total_price_discounted,
		net_total_price_currency,
		invoicing_parties,
		reviewed_invoices,
	} = invoiceData;

	const showExchangeRate = user_data.email === 'ajeet@cogoport.com'
		|| (invoicing_parties || []).some(
			(ip) => !['liners_exchange_rate', 'eta', 'etd'].includes(ip?.exchange_rate_state)
					&& shipment_data?.serial_id < '138811',
		);

	return (
		<div className={styles.container}>
			<div className={styles.flex_row}>
				<div className={styles.total_shipment_title}>Total Shipment Value -</div>

				<div className={styles.shipment_value}>
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

			<div className={styles.edit_invoice}>
				{!isCustomer ? (
					<div className={styles.reviwed_stats}>
						{reviewed_invoices}
						{' '}
						of
						{' '}
						{invoicing_parties?.length}
						{' '}
						reviewed
					</div>
				) : null}

				<div className={styles.Flex}>
					{showExchangeRate ? (
						<ExchangeRate
							refetch={refetch}
							invoiceData={invoiceData}
							shipment_data={shipment_data}
							disableAction={disableAction}
						/>
					) : null}

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
