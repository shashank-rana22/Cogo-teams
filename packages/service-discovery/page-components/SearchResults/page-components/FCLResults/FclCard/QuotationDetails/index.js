import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
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
	const router = useRouter();

	const { total_price_discounted, total_price_currency } = rateCardData;

	const [showContract, setShowContract] = useState(false);

	const formattedAmount = formatAmount({
		amount   : total_price_discounted,
		currency : total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 0,
		},
	});

	const handleSelectButtonClick = () => {
		if (!isSelectedCard) {
			router.push(`/book/${router.query.spot_search_id}?rate_card_id=${rateCardData?.id}`);
			setSelectedCard(rateCardData);
			setScreen('selectedCard');
		} else {
			router.back();
			setSelectedCard({});
			setScreen('listRateCard');
		}
	};

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
				onClick={handleSelectButtonClick}
				size="md"
				themeType="accent"
				className={styles.primaryBotton}
			>
				{!isSelectedCard ? `Select For ${formattedAmount}` : 'Remove'}
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
