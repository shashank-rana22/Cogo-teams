import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';
import CardList from '../../../../commons/CardList';
import styles from './styles.module.css';
import { tableColumn } from './tableColumn';

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

	const billedItemsCode = ['BookingCONV', 'BookingNOST'];
	let showBilledText = true;
	(line_items || []).forEach((items) => {
		if (!billedItemsCode.includes(items?.code)) {
			showBilledText = false;
		}
	});

	const renderBilledText =		showBilledText && quotation_source === 'billed_at_actuals'
		? '*will be billed at actuals'
		: null;

	return (
		<div className={styles.container}>
			<CardList
				loading={loading}
				fields={tableColumn(item)}
				data={line_items || [{}]}
				detail={detail}
			/>

			<div className={styles.totals}>
				<div style={{ minWidth: '12%' }}>
					Total Tax:
					{' '}
					{formatAmount({
						amount   : tax_total_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>

				<div className={styles.total_tax}>
					Total w/o Tax:
					{' '}
					{formatAmount({
						amount   : total_price_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div className={styles.total_container}>
				<div className={styles.billed_text}>{renderBilledText}</div>
				Total Amount After Tax :
				<div className={styles.total_amount}>
					{formatAmount({
						amount   : service_total_discounted,
						currency : service_total_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default InvoiceServiceWise;
