import { Placeholder } from '@cogoport/components';
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
	dashboardLoading = false,
}) {
	return (
		<div className={styles.organic_data}>
			<div className={styles.organic_label}>
				{title}
			</div>

			<div className={styles.organic_amount}>
				{dashboardLoading
					? <Placeholder height={24} width={100} />
					: (
						<>
							{formatAmount({
								amount   : Number(amount) || FALLBACK_AMOUNT,
								currency : currency || geo.country.currency.code,
								options  : {
									currencyWise          : true,
									style                 : 'currency',
									currencyDisplay       : 'symbol',
									notation              : 'compact',
									maximumFractionDigits : 2,
								},
							})}
							{showGrowth ? <Growth showGrowth={showGrowth} /> : null}
						</>
					)}
			</div>

			<div className={styles.transaction_organic}>
				Txn -
				{' '}
				{dashboardLoading
					? <Placeholder height={16} width={50} />
					: transactions}
			</div>
		</div>
	);
}

export default DataView;
