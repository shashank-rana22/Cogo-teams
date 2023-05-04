import getFormattedAmount from '../common/helpers/formatAmount';

import styles from './styles.module.css';

export const serviceMappingConfig = [
	{
		label : '',
		span  : 1,
		key   : 'checkbox',
	},
	{
		label : 'Product Description',
		span  : 4.5,
		key   : 'service',
	},
	{
		label : 'Rate',
		span  : 2.5,
		key   : 'rate',
	},
	{
		label : 'Quantity',
		span  : 1,
		key   : 'quantity',
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

export const renderMappingsFunction = (renderCheck = () => {}) => ({
	checkbox      : (item) => (renderCheck(item)),
	service       : (item) => (<div className={styles.head}>{item?.name}</div>),
	currency      : (item) => (<div className={styles.head}>{item?.currency}</div>),
	rate          : (item) => (<div className={styles.head}>{item?.price}</div>),
	exchange_rate : (item) => (<div className={styles.head}>{item?.exchange_rate?.toFixed(2)}</div>),
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
});
