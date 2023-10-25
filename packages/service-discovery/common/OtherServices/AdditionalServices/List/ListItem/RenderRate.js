import { Placeholder, Tooltip, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const INITIAL_REDUCE_VALUE = 0;
const DEFAULT_PRICE_VALUE = 0;

const formatPrice = (currency, amount) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 0,
	},
});
function RenderRate({
	startingPrices = [],
	startingPriceLoading = false,
	serviceItem = {},
	rateCardData = {},
	handleDelete = () => {},
}) {
	const { isSelected = false } = serviceItem || {};

	if (startingPriceLoading && !isSelected) {
		return (
			<Placeholder
				height="24px"
				width="100px"
				style={{ borderRadius: 4 }}
			/>
		);
	}

	if (!isSelected) {
		const priceObj = (startingPrices || []).find((item) => item.id === serviceItem.name);

		const { price = 0 } = priceObj || {};

		if (!price) return null;

		return (
			<span className={styles.starting_price}>
				Starting at
				{' '}
				<strong>{formatPrice(rateCardData?.total_price_currency, price)}</strong>
				/Ctr.
			</span>
		);
	}

	const { rateData = [], source:rateCardSource = '' } = serviceItem;

	const ratesAvailableArray = rateData.reduce((acc, curr) => {
		const { total_price_discounted, is_rate_available } = curr;
		if (total_price_discounted || total_price_discounted === 0 || is_rate_available) {
			return [...acc, true];
		}
		return [...acc, false];
	}, []);

	const availableRatesCount = ratesAvailableArray.filter((value) => value).length;
	const notAvailableRatesCount = ratesAvailableArray.length - availableRatesCount;

	if (notAvailableRatesCount === ratesAvailableArray.length) {
		let text = 'No Rates';

		if (['fcl_freight_local', 'air_freight_local'].includes(serviceItem.service_type)) {
			if (rateCardSource === 'cogo_assured_rate') {
				return (
					<div>
						<div className={styles.rate_not_available_for_all}>
							<strong>No Rates</strong>

							<Button
								size="sm"
								themeType="accent"
								className={styles.remove_service_button}
								onClick={handleDelete}
							>
								Remove service
							</Button>
						</div>
						<span className={styles.remove_heading}>** Remove this service to continue</span>
					</div>
				);
			}
			text = 'At actuals';
		}
		return text;
	}

	const currency = rateData?.[GLOBAL_CONSTANTS.zeroth_index]?.total_price_currency;

	const totalPrice = rateData.reduce((accumulator, rateItem) => {
		const { total_price_discounted } = rateItem;

		return accumulator + (typeof total_price_discounted === 'number'
			? total_price_discounted : DEFAULT_PRICE_VALUE);
	}, INITIAL_REDUCE_VALUE);

	const formattedAmount = formatPrice(currency, totalPrice);

	if (availableRatesCount === ratesAvailableArray.length) {
		return formattedAmount;
	} return (
		<div className={styles.rate_not_available_for_all}>
			<span>{formattedAmount}</span>

			<Tooltip
				content={(
					<div className={styles.tooltip_content}>
						Rates for all configurations might not be available
					</div>
				)}
				placement="top"
			>
				<IcMInfo height={12} width={12} className={styles.more_icon} />
			</Tooltip>
		</div>
	);
}
export default RenderRate;
