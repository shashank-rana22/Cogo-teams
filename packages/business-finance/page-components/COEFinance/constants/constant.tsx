import { CURRENCY_MAPPING } from '@cogoport/globalization/constants/currencyCode';

const CURRENCY_DATA = Object.entries(CURRENCY_MAPPING).map(([key, value], index) => {
	const Icon = value.icon as React.ComponentType<{ width: number; height: number }>;

	return ({
		id   : index,
		icon : <Icon width={25} height={25} />,
		text : key,
	});
});

const POC_DATA_MAPPING = [
	{ id: '1', label: 'Customer Information' },
	{ id: '2', label: 'Timeline' },
];

export { CURRENCY_DATA, POC_DATA_MAPPING };
