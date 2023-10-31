import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowBack, IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const FALLBACK_AMOUNT = 0;

function Growth({ showGrowth = '' }) {
	if (showGrowth === 'positive') {
		return (
			<IcMArrowBack
				className={styles.arrow_styles}
				fill="#ABCD62"
			/>
		);
	}

	return (
		<IcMArrowNext
			className={styles.arrow_styles}
			fill="#EE3425"
		/>
	);
}

function DataView({
	currency = 'USD',
	amount = 0,
	transactions = 0,
	geo = {},
	title = '',
	showGrowth = '',
}) {
	return (
		<div className={styles.organic_data}>
			<div className={styles.organic_label}>
				{title}
			</div>

			<div className={styles.organic_amount}>
				{formatAmount({
					amount   : Number(amount) || FALLBACK_AMOUNT,
					currency : currency || geo.country.currency.code,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
				{showGrowth ? <Growth showGrowth={showGrowth} /> : null}
			</div>

			<div className={styles.transaction_organic}>
				{`Txn - ${transactions}`}
			</div>
		</div>
	);
}

export default DataView;
