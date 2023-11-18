const POSITIVE_VALUE = 1;
const NEGATIVE_VALUE = -1;
const DEFAULT_VALUE = 0;

const DEFAULT_TRADE_TYPE_ORDER = ['export', 'main', 'import', 'other'];

const reorderServiceRates = ({
	service_type = '',
	service_rates,
	tradeTypeOrder = DEFAULT_TRADE_TYPE_ORDER,
}) => Object.entries(service_rates || {})
	.map(([key, value]) => ({ ...value, key }))
	.sort(
		(
			{
				trade_type: firstElementTradeType = '',
				service_type: firstElementServiceType,
			},
			{
				trade_type: secondElementTradeType = '',
				service_type: secondElementServiceType,
			},
		) => {
			let firstElementFinalTradeType = firstElementServiceType === service_type
				? 'main'
				: firstElementTradeType;

			let secondElementFinalTradeType = secondElementServiceType === service_type
				? 'main'
				: secondElementTradeType;

			if (
				['subsidiary', 'cargo_insurance', 'warehouse'].includes(
					firstElementServiceType,
				)
			) {
				firstElementFinalTradeType = 'other';
			}

			if (
				['subsidiary', 'cargo_insurance', 'warehouse'].includes(
					secondElementServiceType,
				)
			) {
				secondElementFinalTradeType = 'other';
			}

			if (
				tradeTypeOrder.findIndex(
					(item) => firstElementFinalTradeType === item,
				)
					> tradeTypeOrder.findIndex(
						(item) => secondElementFinalTradeType === item,
					)
			) {
				return POSITIVE_VALUE;
			}

			if (
				tradeTypeOrder.findIndex(
					(item) => firstElementFinalTradeType === item,
				)
					< tradeTypeOrder.findIndex(
						(item) => secondElementFinalTradeType === item,
					)
			) {
				return NEGATIVE_VALUE;
			}

			return DEFAULT_VALUE;
		},
	);

export default reorderServiceRates;
