import { Checkbox } from '@cogoport/components';

import getFormattedAmount from '../common/helpers/formatAmount';

import styles from './styles.module.css';

export const lineItemConfig = [
	{
		label : '',
		span  : 0.5,
		key   : 'checkbox',
	},
	{
		label : 'Product Description',
		span  : 4.5,
		key   : 'service',
	},
	{
		label : 'Currency',
		span  : 1.5,
		key   : 'currency',
	},
	{
		label : 'Rate',
		span  : 1.5,
		key   : 'rate',
	},
	{
		label : 'Quantity',
		span  : 1.2,
		key   : 'quantity',
	},
	{
		label : 'Exc. Rate',
		span  : 2,
		key   : 'exchange_rate',
	},

	{
		label : 'Tax Amt.',
		span  : 2.5,
		key   : 'tax_amount',
	},
	{
		label : 'Cost',
		span  : 2,
		key   : 'cost',
	},
];

export const renderPurchaseFunction = {
	checkbox      : () => (<div className={styles.checkbox}><Checkbox disabled checked /></div>),
	service       : (item) => (<div className={styles.head}>{item?.code}</div>),
	currency      : (item) => (<div className={styles.head}>{item?.currency}</div>),
	rate          : (item) => (<div className={styles.head}>{item?.price}</div>),
	exchange_rate : (item) => (<div className={styles.head}>{item?.exchange_rate}</div>),
	quantity      : (item) => (<div className={styles.head}>{item?.quantity}</div>),
	tax_amount    : (item) => (
		<div className={styles.head}>
			{getFormattedAmount(item?.tax_price || 0, item?.currency)}
		</div>
	),
	cost: (item) => (
		<div className={styles.head}>
			{getFormattedAmount(item?.tax_total_price || 0, item?.currency)}
		</div>
	),
};
