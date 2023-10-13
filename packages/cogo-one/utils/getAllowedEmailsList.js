import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

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

function getOrgPoc({
	itm = {},
	defaultOptions = {},
}) {
	let options = { ...defaultOptions };

	itm?.organization_pocs?.forEach(
		(poc) => {
			if (poc?.email) {
				options = {
					...options,
					[poc?.email]: {
						id        : poc?.id,
						label     : poc?.name || poc?.email,
						value     : poc?.email,
						user_type : 'pocs',
						data      : [
							...(options?.[poc?.email]?.data || []),
							{
								name                : itm?.name,
								branch              : itm?.branch,
								address             : itm?.address,
								is_sez              : itm?.is_sez,
								pincode             : itm?.pincode,
								verification_status : itm?.verification_status,
								id                  : itm?.id,
							},
						],
					},
				};
			}
		},
	);

	return options;
}

function getAllowedEmailsList({
	orgData = {},
	searchQuery = '',
	activeTab = 'users',
	selectedOptions = [],
	value = [],
}) {
	const { list: usersList = [] } = orgData || {};

	let options = {};
	let optionsToShow = [];

	if (activeTab !== 'pocs') {
		usersList?.forEach((itm) => {
			if (itm?.email) {
				options = {
					...options,
					[itm?.email]: {
						id        : itm?.id,
						label     : itm?.name || itm?.email,
						value     : itm?.email,
						user_type : 'users',
					},
				};
			}
		});

		optionsToShow = Object.values(options);
	} else {
		usersList?.forEach((itm) => {
			if (!isEmpty(itm?.organization_pocs)) {
				options = getOrgPoc({ itm, defaultOptions: options });
			}
		});

		optionsToShow = Object.values(options)?.filter(
			(itm) => !value.includes(itm.value),
		) || [];
	}

	optionsToShow = [
		...(selectedOptions || []),
		...optionsToShow,
	];

	return [
		...(optionsToShow || []),
		...(activeTab !== 'pocs' ? COGOPORT_MAILS.filter(
			(itm) => (itm.value.includes(searchQuery) || itm.label.includes(searchQuery)),
		) : []),
	];
}

export default getAllowedEmailsList;
