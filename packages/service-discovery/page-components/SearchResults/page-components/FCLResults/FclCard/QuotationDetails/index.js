import { Button, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Contract from '../../../../common/Contract';

import styles from './styles.module.css';

function QuotationDetails({
	rateCardData = {},
	isSelectedCard = false,
	isCogoAssured = false,
	isMultiContainer = false,
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
			setScreen('selectedCardScreen');
		} else {
			router.back();
		}
	};

	return (
		<div className={styles.container}>
			{(isCogoAssured || isMultiContainer) && !isSelectedCard ? null : (
				<Button
					size="md"
					themeType={isSelectedCard ? 'tertiary' : 'secondary'}
					className={styles.secondary_button}
					disabled={isSelectedCard}
					onClick={() => setShowContract(!showContract)}
				>
					{isSelectedCard ? ('Currrently Selected') : 'Lock Freight Price'}
				</Button>
			)}

			<Button
				onClick={handleSelectButtonClick}
				size="md"
				themeType="accent"
				className={cl`${styles.primary_button} ${isSelectedCard ? {} : styles.green}`}
			>
				{!isSelectedCard ? `Select For ${formattedAmount}` : 'Remove'}
			</Button>

			{showContract ? (
				<Contract
					data={rateCardData}
					detail={detail}
					setShow={setShowContract}
					show={showContract}
				/>
			) : null}

		</div>
	);
}

export default QuotationDetails;
