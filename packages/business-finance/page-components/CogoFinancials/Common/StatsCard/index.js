import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import formatCount from '../../utils/formatCount';
import RenderCardHeader from '../RenderCardHeader';

import styles from './styles.module.css';

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		notation              : 'compact',
		maximumFractionDigits : 2,
	},
});

function StatsCard({
	heading = '', cardId = '', setActiveShipmentCard = () => {},
	showPill = false, cardData = [], loading = false, taxType = '',
	infoContent = '',
	isAdditonalView = false,
}) {
	const { currency, invoiceCount = 0, jobCount = 0 } = cardData;

	const mappingCards = [
		{
			label : 'Estimated Revenue',
			value : displayAmount(cardData[`estimatedRevenue${taxType}`], currency),
			stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
		},
		{
			label : 'Estimated Cost',
			value : displayAmount(cardData[`estimatedCost${taxType}`], currency),
			stats : `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`,
		},
	];

	return (
		<div
			className={styles.container}
			style={{ height: isAdditonalView ? '100%' : '49%' }}

		>
			<div className={styles.flexhead}>
				<div data-tour="ongoing-shipments-heading">
					<RenderCardHeader
						title={heading}
						showInfo
						infoContent={infoContent}
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
					data-tour="ongoing-card"
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
						<Placeholder height={156} width="100%" />
					</div>
				)}
		</div>
	);
}

export default StatsCard;
