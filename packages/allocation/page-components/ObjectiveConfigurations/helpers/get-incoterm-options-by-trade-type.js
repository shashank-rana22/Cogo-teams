import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getIncotermOptionsByTradeType = ({ trade_type }) => Object.entries(GLOBAL_CONSTANTS.options.inco_term)
	.reduce((accumulatedOptions, [key, value]) => {
		const { label, trade_type: optionTradeType } = value;

		if (trade_type === optionTradeType) {
			return [...accumulatedOptions, { label, value: key }];
		}

		return accumulatedOptions;
	}, []);

export default getIncotermOptionsByTradeType;
