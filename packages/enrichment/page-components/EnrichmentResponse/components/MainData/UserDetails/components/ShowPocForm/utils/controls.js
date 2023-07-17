import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import workScopes from '../../../../../../utils/work-scopes.json';

const getControls = () => {
	const geo = getGeoConstants();

	const controls = [
		{
			name        : 'name',
			label       : 'Name',
			type        : 'text',
			placeholder : 'Enter name',

		},
		{
			name        : 'email',
			label       : 'Email ID',
			type        : 'text',
			placeholder : 'Enter email',
			rules       : {
				required : false,
				pattern  : {
					value   : GLOBAL_CONSTANTS.regex_patterns.email,
					message : 'Email is invalid',
				},
			},

		},
		{
			name        : 'mobile_number',
			label       : 'Mobile Number',
			type        : 'mobile-number-select',
			placeholder : 'Type here...',

		},

		{
			name        : 'alternate_mobile_number',
			label       : 'Alternate Number',
			type        : 'mobile-number-select',
			placeholder : 'Type here...',
		},
		{
			name        : 'whatsapp_number',
			label       : geo.navigations.enrichment.whatsapp_number_label,
			type        : 'mobile-number-select',
			placeholder : 'Type here...',
		},

		{
			name        : 'work_scopes',
			label       : 'Role in Company',
			type        : 'multiSelect',
			placeholder : 'Select role type',
			options     : workScopes,
		},
	];

	return controls;
};

export default getControls;
