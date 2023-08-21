import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';

import formatCount from '../../utils/formatCount';
import { TourContext } from '../Contexts';
import { SINGLE_SERVICE_STEPS } from '../tourSteps';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const DEFAULT_INDEX = 1;
const MINIMUM_PROFIT = 0;

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

function StatCard({ mappingCards = [], service = '', isMain = false, singleServiceData = [], taxType = '' }) {
	const { tour, setTour } = useContext(TourContext);
	const { currency, invoiceCount, jobCount } = singleServiceData;

	const getProfitColor = ({ amount, isProfit }) => {
		if (!isProfit) return '#000';

		if (amount > MINIMUM_PROFIT) {
			return '#abcd62';
		}
		return '#ee3425';
	};

	return (
		<div
			className={cl`${styles.statscontainer} ${!isMain && styles.border}`}
			data-tour={!isMain ? 'single-service' : null}
		>
			<Tour
				steps={SINGLE_SERVICE_STEPS}
				isOpen={tour && !isEmpty(mappingCards)}
				onRequestClose={() => setTour(false)}
				maskClassName={styles.tour_mask}
				startAt={0}
				closeWithMask={false}
			/>
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
						{isMain ? (
							<div style={{ color: item?.profitColor || null }}>
								{item.value}
							</div>
						) : (
							<div style={{
								color: getProfitColor(
									{
										amount   : singleServiceData[`${item.key}${taxType}`],
										isProfit : (item?.label)?.includes('Profit'),
									},
								),
							}}
							>
								{displayAmount(singleServiceData[`${item.key}${taxType}`], currency)}
							</div>
						)}
					</div>
					<div className={cl`${styles.statval}
					${!isMain && styles.fontstatval}`}
					>
						{isMain ? item.stats
							: `${formatCount(invoiceCount)} Invoices | ${formatCount(jobCount)} Shipments`}
					</div>
				</div>
			))}
		</div>
	);
}

export default StatCard;
