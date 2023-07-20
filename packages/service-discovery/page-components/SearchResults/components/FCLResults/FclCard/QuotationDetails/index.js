import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import CreateContract from '../../../../common/CreateContract';

import styles from './styles.module.css';

function QuotationDetails({
	rateCardData = {},
	setSelectedCard = () => {},
	isSelectedCard = false,
	detail = {},
	setScreen = () => {},
}) {
	const { total_price_discounted, total_price_currency } = rateCardData;

	const [showContract, setShowContract] = useState(false);

	return (
		<div className={styles.container}>
			<Button
				size="md"
				themeType={isSelectedCard ? 'tertiary' : 'secondary'}
				className={styles.secondaryBotton}
				disabled={isSelectedCard}
				onClick={() => setShowContract(!showContract)}
			>
				{isSelectedCard ? ('Currrently Selected') : 'Lock Freight Price'}
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
						amount   : total_price_discounted,
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

			{showContract ? (
				<CreateContract
					data={rateCardData}
					details={detail}
					setShowContract={setShowContract}
					showContract={showContract}
				/>
			) : null}

		</div>
	);
}

export default QuotationDetails;
