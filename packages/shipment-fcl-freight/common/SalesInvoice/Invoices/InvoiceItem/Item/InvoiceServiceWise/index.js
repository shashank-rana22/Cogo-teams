import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import CardList from '../../../../commons/CardList';

import styles from './styles.module.css';
import { TableColumn } from './TableColumn';

const BILLED_ITEMS_CODE = ['BookingCONV', 'BookingNOST'];

function InvoiceServiceWise({ item = {}, loading = false }) {
	const {
		service_total_discounted,
		service_total_currency,
		tax_total_discounted,
		total_price_discounted,
		line_items = [],
		quotation_source = '',
		detail = {},
	} = item || {};

	let showBilledText = true;
	(line_items || []).forEach((items) => {
		if (!BILLED_ITEMS_CODE.includes(items?.code)) {
			showBilledText = false;
		}
	});

	const renderBilledText = showBilledText && quotation_source === 'billed_at_actuals' ? '*will be billed at actuals'
		: null;

	const format = (amount, currency) => formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={styles.container}>
			<CardList
				loading={loading}
				fields={TableColumn(item)}
				data={line_items || [{}]}
				detail={detail}
			/>

			<div className={styles.totals}>
				<div style={{ minWidth: '12%' }}>
					Total Tax:
					{' '}
					{format(tax_total_discounted, service_total_currency)}
				</div>

				<div className={styles.total_tax}>
					Total w/o Tax:
					{' '}
					{format(total_price_discounted, service_total_currency)}
				</div>
			</div>

			<div className={styles.total_container}>
				<div className={styles.billed_text}>{renderBilledText}</div>
				Total Amount After Tax :
				<div className={styles.total_amount}>
					{format(service_total_discounted, service_total_currency)}
				</div>
			</div>
		</div>
	);
}

export default InvoiceServiceWise;
