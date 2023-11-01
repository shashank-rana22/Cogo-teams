import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ProceedButton({
	rate = {},
	isSelectedCard = false,
	setRouterLoading = () => {},
}) {
	const router = useRouter();

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
		} else {
			setRouterLoading(true);
			router.push(`/book/${router.query.spot_search_id}`);
		}
	};

	return (
		<Button
			onClick={handleSelectButtonClick}
			size="md"
			themeType={isSelectedCard ? 'secondary' : 'accent'}
			className={styles.button}
		>
			{isSelectedCard ? 'Select Another' : `Select For ${formattedAmount}` }
		</Button>
	);
}

export default ProceedButton;
