import { Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import CargoDetailPills from '../../../../../../List/Card/Body/CargoDetails/CargoDetailPills';

import styles from './styles.module.css';
import { tableColumn } from './tableColumn';

function InvoiceServiceWise({ item = {}, loading = false, shipment_data }) {
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
	const tableData = (line_items || []).map(({
		name, alias, currency, price, quantity,
		discount_price, exchange_rate, tax_price,
		tax_percent, tax_total_price,
		tax_total_price_discounted, code,
	}) => {
		if (!billedItemsCode.includes(code)) {
			showBilledText = false;
		}
		return ({
			name,
			alias        : startCase(alias) || '---',
			currency,
			price,
			quantity,
			discount_price,
			exchange_rate,
			tax_amt      : `${currency} ${tax_price} (${tax_percent}%)`,
			amt_with_tax : `${currency} ${tax_total_price || tax_total_price_discounted}`,

		});
	});
	const renderBilledText = showBilledText && quotation_source === 'billed_at_actuals'
		? '*will be billed at actuals'
		: null;

	return (
		<div className={styles.container}>
			<div className={styles.cargo_detail_pill_container}>
				<CargoDetailPills detail={detail} />
			</div>
			<Table
				loading={loading}
				columns={tableColumn(item, shipment_data)}
				data={tableData}
			/>

			<div className={styles.totals}>
				<div className={styles.total_tax}>
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
