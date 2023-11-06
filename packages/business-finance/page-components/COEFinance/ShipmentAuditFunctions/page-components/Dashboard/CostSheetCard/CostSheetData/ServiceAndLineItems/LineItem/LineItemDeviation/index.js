import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function LineItemDeviation({
	currency = '',
	sellOrBuyQuotTotal = '',
	invOrBillTotal = '',
	deviation = '',
}) {
	if (sellOrBuyQuotTotal === '' && !isEmpty(invOrBillTotal)) {
		return (
			<div className={styles.regular}>
				{ formatAmount({
					amount   : invOrBillTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill size="sm" color="red">Not Quoted</Pill>
			</div>
		);
	}
	if (invOrBillTotal === '' && !isEmpty(sellOrBuyQuotTotal)) {
		return (
			<div className={styles.faded}>
				{ formatAmount({
					amount   : sellOrBuyQuotTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<span>(Expected)</span>
			</div>
		);
	}
	if (!isEmpty(sellOrBuyQuotTotal) && !isEmpty(invOrBillTotal)) {
		return (
			<div className={styles.regular}>
				{ formatAmount({
					amount   : invOrBillTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill size="sm" color={deviation >= 0 ? 'green' : 'red'}>
					{`${deviation}%`}
				</Pill>
			</div>
		);
	}
	return null;
}

export default LineItemDeviation;
