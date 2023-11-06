import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useContext, useState, useEffect, useMemo, useCallback } from 'react';

import canSeeMargin from '../../../../../../helpers/canSeeMargin';
import useGetPermission from '../../../../../../helpers/useGetPermission';
import { CheckoutContext } from '../../../../context';

import ProfitOutlook from './ProfitOutlook';
import styles from './styles.module.css';

const ONE = 1;
const ROUND_OFF_VALUE = 2;
const MAX_PERCENT = 100;
const DEFAULT_VALUE = 0;

const geo = getGeoConstants();

function BreakdownDetailsHeader({
	disableForm = false,
	resetMargins = () => {},
	rateDetails = [],
	checkoutSource = '',
}) {
	const { rate = {}, conversions = {}, isMobile = false } = useContext(CheckoutContext);

	const { isConditionMatches } = useGetPermission({ navigation: 'service_discovery' });

	const condition = canSeeMargin(
		'partner',
		{ isConditionMatches },
		[],
	);

	const [profitPercent, setProfitPercent] = useState(DEFAULT_VALUE);

	const [latestDemandMargin, setLatestDemandMargin] = useState(DEFAULT_VALUE);

	const convertCurrencyValue = useCallback(
		(value, fromCurrency, toCurrency) => {
			const {
				base_currency,
				currencies,
				currency_conversion_delta = 0.04,
				cogofx_currencies = {},
			} = conversions || {};

			const fxFees = ONE + currency_conversion_delta;
			if (fromCurrency === toCurrency) {
				return value;
			}
			if (base_currency === fromCurrency) {
				return (value / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
			}
			const inBase = value * (currencies[fromCurrency] || cogofx_currencies[fromCurrency]);
			return (inBase / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
		},
		[conversions],
	);

	let buyPrice = 0;

	Object.keys(rate?.services || {}).forEach((service_id) => {
		rate?.services[service_id].line_items.forEach((obj) => {
			buyPrice += convertCurrencyValue(
				obj.total_buy_price,
				obj.currency,
				geo.country.currency.code,
			);
		});
	});

	let cogoAndSupplyMargin = 0;

	cogoAndSupplyMargin += convertCurrencyValue(
		rate?.total_margins.supply,
		rate?.total_margins?.currency,
		geo.country.currency.code,
	);
	cogoAndSupplyMargin += convertCurrencyValue(
		rate?.total_margins.cogoport,
		rate?.total_margins?.currency,
		geo.country.currency.code,
	);

	const editedMargins = useMemo(
		() => rateDetails.reduce((acc, cur) => {
			const { id = '', line_items = [] } = cur;

			return {
				...acc,
				[id]: line_items.map(({ filteredMargins }) => filteredMargins),
			};
		}, {}),
		[rateDetails],
	);

	useEffect(() => {
		let newDemandMargin = 0;
		let finalMargin = 0;

		let totalPrice = buyPrice;
		totalPrice += cogoAndSupplyMargin;

		Object.keys(editedMargins || {})?.forEach((service_id) => {
			editedMargins[service_id]?.forEach((editedMargin) => {
				const { value = 0, code = '', type = '', currency = '' } = editedMargin || {};

				if (value) {
					if (type === 'absolute_total') {
						newDemandMargin += convertCurrencyValue(
							Number(value),
							currency,
							geo.country.currency.code,
						);
					} else {
						const lineItems = rate?.services[service_id]?.line_items;

						lineItems?.forEach((lItem) => {
							const { quantity = 0, code:lItemCode = '' } = lItem;

							if (lItemCode === code) {
								const temp = Number(value) * quantity;
								newDemandMargin += convertCurrencyValue(
									temp,
									currency,
									rate?.total_price_currency || geo.country.currency.code,
								);
							}
						});
					}
				}
			});
		});

		finalMargin = newDemandMargin;

		if (condition.isSuperAdmin) {
			finalMargin += cogoAndSupplyMargin;
			totalPrice -= cogoAndSupplyMargin;
		}

		let percent = (finalMargin / totalPrice) * MAX_PERCENT;
		percent = parseFloat(percent).toFixed(ROUND_OFF_VALUE);

		setProfitPercent(totalPrice ? percent : DEFAULT_VALUE);
		setLatestDemandMargin(parseFloat(finalMargin).toFixed(ROUND_OFF_VALUE));
	}, [
		buyPrice,
		cogoAndSupplyMargin,
		condition.isSuperAdmin,
		convertCurrencyValue,
		editedMargins,
		rate?.services,
		rate?.total_price_currency,
	]);

	if (checkoutSource === 'spot_line_booking') {
		return null;
	}

	return (
		<div className={styles.header}>
			{!disableForm ? (
				<div className={styles.heading}>Add or Edit Margin</div>
			) : null}

			<ProfitOutlook
				rate={rate}
				profitPercent={profitPercent}
				latestDemandMargin={latestDemandMargin}
				condition={condition}
				isMobile={isMobile}
				convertCurrencyValue={convertCurrencyValue}
			/>

			{!disableForm ? (
				<Button
					type="button"
					themeType="secondary"
					size="xl"
					onClick={resetMargins}
				>
					Reset
				</Button>
			) : null}
		</div>
	);
}

export default BreakdownDetailsHeader;
