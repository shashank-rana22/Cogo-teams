import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import RenderCardHeader from '../RenderCardHeader';

import styles from './styles.module.css';

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function StatsCard({
	heading = '', cardId = '', setActiveShipmentCard = () => {},
	showPill = false, cardData = [], loading = false, taxType = '',
}) {
	const { currency, invoiceCount = 0, jobCount = 0 } = cardData;

	const mappingCards = [
		{
			label : 'Estimated Revenue',
			value : displayAmount(cardData[`estimatedRevenue${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
		{
			label : 'Estimated Cost',
			value : displayAmount(cardData[`estimatedCost${taxType}`], currency),
			stats : `${invoiceCount} Invoices | ${jobCount} Shipments`,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<div>
					<RenderCardHeader
						title={heading}
						showInfo
					/>
				</div>
				{showPill && !loading && (
					<div className={styles.tag}>
						Not Matching
					</div>
				)}
			</div>
			{!loading ? (
				<div
					className={styles.statscontainer}
					onClick={() => setActiveShipmentCard(cardId)}
					role="presentation"
					style={{ cursor: !isEmpty(cardId) ? 'pointer' : null }}
				>
					{mappingCards.map((item) => (
						<div className={styles.stats} key={item.label}>
							<div className={styles.stathead}>
								{item.label}
							</div>
							<div className={styles.value}>
								{item.value}
							</div>
							<div className={styles.statval}>
								{item.stats}
							</div>
						</div>
					))}
				</div>
			)
				: (
					<div style={{ marginTop: '8px' }}>
						<Placeholder height={200} width="100%" />
					</div>
				)}
		</div>
	);
}

export default StatsCard;
