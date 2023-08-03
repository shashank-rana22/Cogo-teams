import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getFormattedAmount from '../../common/helpers/formatAmount';

import styles from './styles.module.css';

const SECOND_INDEX = 2;

export const renderServiceMappings = (renderCheck = () => { }) => ({
	checkbox : (item) => (renderCheck(item)),
	service  : (item) => (
		<div className={styles.head}>
			{item?.name}
			{' '}
			(
			{item.code}
			)
		</div>
	),
	currency      : (item) => (<div className={styles.head}>{item?.currency}</div>),
	rate          : (item) => (<div className={styles.head}>{item?.price}</div>),
	exchange_rate : (item) => (<div className={styles.head}>{item?.exchange_rate?.toFixed(SECOND_INDEX)}</div>),
	quantity      : (item) => (<div className={styles.head}>{item?.quantity}</div>),
	tax_amount    : (item) => (
		<div className={styles.head}>
			{getFormattedAmount(item?.tax_price || GLOBAL_CONSTANTS.zeroth_index, item?.currency)}
		</div>
	),
	cost: (item) => (
		<div className={styles.head}>
			{getFormattedAmount(item?.tax_total_price || GLOBAL_CONSTANTS.zeroth_index, item?.currency)}
		</div>
	),
});
