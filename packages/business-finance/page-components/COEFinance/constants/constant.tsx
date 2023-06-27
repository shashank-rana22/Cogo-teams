import CURRENCY_ICON_MAPPING from '@cogoport/globalization/constants/currencyIconMapping';

const CURRENCY_DATA = Object.keys(CURRENCY_ICON_MAPPING).map((key, index) => {
	const Icon = CURRENCY_ICON_MAPPING[key];

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
