import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
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
	setRouterLoading = () => {},
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
			maximumFractionDigits : 2,
		},
	});

	const handleSelectButtonClick = () => {
		if (!isSelectedCard) {
			router.push(`/book/${router.query.spot_search_id}?rate_card_id=${rateCardData?.id}`);

			setScreen('selectedCardScreen');
		} else {
			setRouterLoading(true);
			router.push(`/book/${router.query.spot_search_id}`);
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
				themeType={isSelectedCard ? 'secondary' : 'accent'}
				className={styles.primary_button}
			>
				{!isSelectedCard ? `Select For ${formattedAmount}` : 'Select Another'}
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
