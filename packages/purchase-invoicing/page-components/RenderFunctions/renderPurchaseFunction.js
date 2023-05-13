import { Checkbox } from '@cogoport/components';

import getFormattedAmount from '../../common/helpers/formatAmount';

import styles from './styles.module.css';

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
