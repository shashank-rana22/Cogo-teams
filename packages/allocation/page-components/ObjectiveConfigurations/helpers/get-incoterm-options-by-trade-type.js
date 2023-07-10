import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getIncotermOptionsByTradeType = ({ trade_type }) => {
	const incotermOptions = Object.entries(GLOBAL_CONSTANTS.options.inco_term)
		.reduce((accumulatedOptions, [key, value]) => {
			const { label, trade_type: optionTradeType } = value;

			let newAccumulatedOptions = [];

			if (trade_type === optionTradeType) {
				newAccumulatedOptions = [...accumulatedOptions, { label, value: key }];
			}

			return newAccumulatedOptions;
		}, []);

	return incotermOptions;
};

export default getIncotermOptionsByTradeType;
