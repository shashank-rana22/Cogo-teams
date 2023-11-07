import { Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

const getPriceBreakUpColumn = [
	{
		Header   : <div className={styles.label}>Service name</div>,
		id       : 'service_name',
		accessor : ({ name = '' }) => (
			<strong>{startCase(name)}</strong>
		),
	},
	{
		Header   : <div className={styles.label}>Currency</div>,
		id       : 'currency',
		accessor : ({ currency = '' }) => (
			<span>
				{currency}
			</span>
		),
	},
	{
		Header   : <div className={styles.label}>Original Price</div>,
		id       : 'price',
		accessor : ({ price = '', currency }) => (
			<strong>
				{formatAmount({
					amount  : price || DEFAULT_VALUE,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</strong>
		),
	},
	{
		Header   : <div className={styles.label}>Unit</div>,
		id       : 'unit',
		accessor : ({ unit = '' }) => (
			<span>
				{startCase(unit)}
			</span>
		),
	},
	{
		Header   : <div className={styles.label}>QTY.</div>,
		id       : 'quantity',
		accessor : ({ quantity = '' }) => (
			<span>
				{quantity}
			</span>
		),
	},
	{
		Header   : <div className={styles.bold_label}>Final Price</div>,
		id       : 'total_price_discounted',
		accessor : ({ total_price_discounted = '', currency = '' }) => (
			<strong>
				{formatAmount({
					amount  : total_price_discounted || DEFAULT_VALUE,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
			</strong>
		),
	},
];

function LineItems({ line_items = [] }) {
	if (isEmpty(line_items)) return null;

	return (
		<div className={styles.table}>
			<Table
				columns={getPriceBreakUpColumn}
				data={line_items}
			/>
		</div>
	);
}

export default LineItems;
