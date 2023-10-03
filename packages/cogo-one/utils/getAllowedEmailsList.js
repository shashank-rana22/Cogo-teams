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

function getAllowedEmailsList({ orgData = {} }) {
	const { list: usersList = [] } = orgData || {};

	let options = [];

	usersList.forEach((itm) => {
		if (itm?.email) {
			options = [
				...options,
				{
					label : itm?.name,
					value : itm.email,
				},
			];
		}
	});

	options = [
		...options,
		...COGOPORT_MAILS,
	];

	return options;
}

export default getAllowedEmailsList;
