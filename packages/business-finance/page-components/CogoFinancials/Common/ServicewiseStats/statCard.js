import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_INDEX = 1;

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function StatCard({ mappingCards = [], service = '', isMain = false, singleServiceData = [], taxType = '' }) {
	const { currency, invoiceCount, jobCount } = singleServiceData;
	return (
		<div className={cl`${styles.statscontainer} ${!isMain && styles.border}`}>
			{isMain ? null : (
				<div className={styles.service}>
					{service}
					<div className={styles.underline} />
				</div>
			)}
			{mappingCards.map((item, index) => (
				<div className={cl`${styles.stats} ${isMain && styles.margin}`} key={item.label}>
					<div className={cl`${styles.stathead} ${!isMain && styles.fontlabel}`}>
						{item.label}
					</div>
					<div className={cl`${styles.value}
					${!isMain && styles.fontvalue} 
					${mappingCards?.length === index + DEFAULT_INDEX && styles.color}`}
					>
						{isMain ? item.value : displayAmount(singleServiceData[`${item.key}${taxType}`], currency)}
					</div>
					<div className={cl`${styles.statval}
					${!isMain && styles.fontstatval}`}
					>
						{isMain ? item.stats : `${invoiceCount} Invoices | ${jobCount} Shipments`}
					</div>
				</div>
			))}
		</div>
	);
}

export default StatCard;
