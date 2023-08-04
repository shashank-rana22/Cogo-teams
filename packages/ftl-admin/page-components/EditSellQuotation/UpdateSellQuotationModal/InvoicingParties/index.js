import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from '../../Card/styles.module.css';
import InvoiceCard from '../InvoiceCard';

const FIXED_VALUE_FOR_INVOICE_TOTAL = 2;

function InvoicingParties({
	regNumber = '', invoicingPartiesWiseTotal = {},
	invoicingParties = [],
	refetch = () => {},
}) {
	const INVOICING_PARTIES_DATA = invoicingParties
		.filter((item) => item?.billing_address?.registration_number === regNumber);

	const {
		total_price_discounted = '', total_price_currency = '',
	}	= invoicingPartiesWiseTotal[regNumber] || {};

	const INVOICING_PARTY_NAME = INVOICING_PARTIES_DATA?.[GLOBAL_CONSTANTS.zeroth_index]
		?.billing_address?.business_name;

	return (
		<div>
			<div className={styles.modal_bottom_container}>
				<div className={styles.invoice_values}>
					<div>
						<span style={{ color: '#c26d1a' }}>
							{INVOICING_PARTY_NAME}
						</span>
					</div>

					<div>
						Total Invoice Value :
						{' '}
						<span style={{ color: '#c26d1a' }}>
							{' '}
							{total_price_currency}
							{' '}
							{total_price_discounted.toFixed(FIXED_VALUE_FOR_INVOICE_TOTAL)}
						</span>
					</div>
				</div>
				{INVOICING_PARTIES_DATA?.map((item) => (
					<InvoiceCard
						data={item}
						key={item?.id}
						refetch={refetch}
					/>
				))}

			</div>
		</div>
	);
}

export default InvoicingParties;
