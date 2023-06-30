import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function QuotationDetails({ rateCardData, setSelectedCard = () => {}, isSelectedCard = false, setScreen = () => {} }) {
	const { total_price_discounted, total_price_currency } = rateCardData;

	return (
		<div className={styles.container}>
			<Button
				onClick={() => {

				}}
				size="md"
				themeType={isSelectedCard ? 'tertiary' : 'secondary'}
				className={styles.secondaryBotton}
				disabled={isSelectedCard}
			>
				{isSelectedCard ? ('Currrently Selected') : 'Lock Frieght Price'}
			</Button>
			<Button
				onClick={() => {
					if (!isSelectedCard) {
						setSelectedCard(rateCardData);
						setScreen('selectedCard');
					} else {
						setSelectedCard({});
						setScreen('listRateCard');
					}
				}}
				size="md"
				themeType="accent"
				className={styles.primaryBotton}
			>
				{!isSelectedCard ? (
					` Select For ${formatAmount({
						amount   : total_price_discounted || 0,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}`) : (
					'Remove'
				)}

			</Button>
		</div>
	);
}

export default QuotationDetails;
