import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const COGOPORT_MAILS = [
	{
		label : 'HR',
		value : GLOBAL_CONSTANTS?.emails?.hr,
	},
	{
		label : 'Internal Supply',
		value : GLOBAL_CONSTANTS?.emails?.internal_supply,
	},
	{
		label : 'Internal Operations',
		value : GLOBAL_CONSTANTS?.emails?.internal_operations,
	},
	{
		label : 'Internal Service',
		value : GLOBAL_CONSTANTS?.emails?.internal_service,
	},
];

function getAllowedEmailsList({
	orgData = {},
	searchQuery = '',
}) {
	const { list: usersList = [] } = orgData || {};

	let options = [];

	usersList?.forEach((itm) => {
		if (itm?.email) {
			options = [
				...options,
				{
					id    : itm?.id,
					label : itm?.name || itm?.email,
					value : itm?.email,
				},
			];
		}
	});

	options = [
		...options,
		...COGOPORT_MAILS.filter(
			(itm) => (itm.value.includes(searchQuery) || itm.label.includes(searchQuery)),
		),
	];

	return options;
}

export default getAllowedEmailsList;
