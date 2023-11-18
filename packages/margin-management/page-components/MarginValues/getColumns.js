import { startCase } from '@cogoport/utils';

const getColumns = (handlePercentage = () => { }) => {
	const COLUMNS = [
		{
			id       : 'lower_limit',
			Header   : 'Lower Limit',
			accessor : ({ lower_limit = '', margin_slabs_currency = '' }) => `${lower_limit} ${margin_slabs_currency}`,
		},
		{
			id       : 'upper_limit',
			Header   : 'Upper Limit',
			accessor : ({ upper_limit = '', margin_slabs_currency = '' }) => `${upper_limit === null
				? 'INF' : upper_limit} ${margin_slabs_currency}`,
		},
		{
			id       : 'code',
			Header   : 'Code',
			accessor : ({ code = '' }) => `${code || '--'}`,
		},
		{
			id       : 'value',
			Header   : 'Value',
			accessor : ({ type = '', value = '', currency = '' }) => `${type === 'percentage'
				? `${value} %`
				: `${currency} ${value}`}`,
		},
		{
			id       : 'type',
			Header   : 'Type',
			accessor : (item) => `${startCase(item?.type)} ${handlePercentage(item)}`,
		},
	];
	return COLUMNS;
};

export default getColumns;
