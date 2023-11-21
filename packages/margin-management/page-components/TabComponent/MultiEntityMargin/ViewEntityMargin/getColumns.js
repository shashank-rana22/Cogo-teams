import { startCase } from '@cogoport/utils';

const handlePercentage = (item) => {
	if (item?.type === 'percentage') {
		if (item?.min_value && item?.max_value) {
			if (item?.min_value === item?.max_value) {
				return item?.min_value;
			}
			return `${item?.currency}(${item?.min_value}-${item?.max_value})`;
		}
		return item?.currency;
	}
	return null;
};

function getColumns() {
	const columns = [
		{
			id       : 'lower_limit',
			Header   : 'Lower Limit',
			accessor : ({ lower_limit, currency }) => `${currency} ${lower_limit}`,
		},
		{
			id       : 'upper_limit',
			Header   : 'Upper Limit',
			accessor : ({ upper_limit, currency }) => `${currency} ${upper_limit}`,
		},
		{
			id       : 'value',
			Header   : 'Value',
			accessor : ({ value, currency }) => `${currency} ${value}`,
		},
		{
			id       : 'type',
			Header   : 'Type',
			accessor : (item) => (
				<>
					{startCase(item?.type)}
					{' '}
					(
					{handlePercentage(item)}
					)
				</>
			),
		},
	];

	return columns;
}

export default getColumns;
