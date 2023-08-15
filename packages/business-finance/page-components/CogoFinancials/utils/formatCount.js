import formatAmount from '@cogoport/globalization/utils/formatAmount';

const formatCount = (count) => formatAmount({
	amount  : count,
	options : {
		style                 : 'decimal',
		maximumFractionDigits : 2,
	},
});

export default formatCount;
