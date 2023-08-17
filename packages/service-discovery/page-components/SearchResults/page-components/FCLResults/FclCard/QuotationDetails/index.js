import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useState } from 'react';

import Contract from '../../../../common/Contract';

import styles from './styles.module.css';

function QuotationDetails({
	rateCardData = {},
	isSelectedCard = false,
	isCogoAssured = false,
	isMultiContainer = false,
	detail = {},
	setScreen = () => {},
	setMainScreen = () => {},
}) {
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
		if (typeof window === 'undefined') {
			return;
		}

		if (!isSelectedCard) {
			const newUrl = new URL(window.location);
			newUrl.searchParams.set('rate_card_id', rateCardData?.id);

			window.history.pushState({ path: newUrl.href }, '', newUrl.href);

			setScreen('selectedCardScreen');
		} else {
			const newUrl = new URL(window.location);
			newUrl.searchParams.delete('rate_card_id');

			window.history.pushState({ path: newUrl.href }, '', newUrl.href);
			setMainScreen('listRateCard');
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
				className={styles.primary_button}
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
