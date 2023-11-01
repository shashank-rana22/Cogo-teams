import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Contract from '../../../../../../../../../common/Contract';

import styles from './styles.module.css';

function Buttons({
	rate = {},
	detail = {},
	isSelectedCard = false,
	setScreen = () => {},
	setRouterLoading = () => {},
}) {
	const router = useRouter();

	const [showContract, setShowContract] = useState(false);

	const { total_price_discounted, total_price_currency } = rate;

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
			router.push(`/book/${router.query.spot_search_id}?rate_card_id=${rate?.id || rate?.card}`);

			setScreen('selectedCardScreen');
		} else {
			setRouterLoading(true);
			router.push(`/book/${router.query.spot_search_id}`);
		}
	};

	return (
		<div className={styles.container}>
			{!isSelectedCard ? (
				<Button
					size="md"
					themeType={isSelectedCard ? 'tertiary' : 'secondary'}
					className={styles.secondary_button}
					disabled={isSelectedCard}
					onClick={() => setShowContract(!showContract)}
				>
					Lock Freight Price
				</Button>
			) : null}

			<Button
				onClick={handleSelectButtonClick}
				size="md"
				themeType={isSelectedCard ? 'secondary' : 'accent'}
				className={styles.primary_button}
			>
				{isSelectedCard ? 'Select Another' : `Select For ${formattedAmount}` }
			</Button>

			{showContract ? (
				<Contract
					data={rate}
					detail={detail}
					setShow={setShowContract}
					show={showContract}
				/>
			) : null}
		</div>
	);
}

export default Buttons;
