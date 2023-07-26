import { startCase } from '@cogoport/utils';

import officeLocations from '../../../../../../../../../utils/office-locations.json';
import workScopes from '../../../../../../../../../utils/work-scopes.json';

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { flexBasis: '42%' },
		placeholder : 'Enter Name',
		rules       : { required: 'Contact Name is required' },
		showIn      : ['editPOC'],
	},
	{
		name        : 'email',
		label       : 'Contact Email ID',
		type        : 'text',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here..',
		rules       : {
			required : 'Email of the Contact is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
		showIn: ['editPOC'],
	},
	{
		name        : 'mobile_number',
		label       : 'Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },
		showIn      : ['editPOC'],
	},
	{
		name        : 'poc_role',
		label       : 'Role in Company',
		type        : 'multiSelect',
		placeholder : 'Select a role type',
		style       : { flexBasis: '42%' },
		rules       : { required: 'Company Type is required' },
		options     : workScopes,
		showIn      : ['editPOC'],
	},
	{
		name        : 'category',
		label       : 'Category',
		type        : 'asyncSelect',
		placeholder : 'Select Category',
		asyncKey    : 'list_expense_category',
		renderLabel : (item) => startCase(item.categoryName),
		valueKey    : 'categoryName',
		style       : { flexBasis: '42%' },
		rules       : { required: 'Category is required' },

	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Branch',
		type        : 'select',
		placeholder : 'Select a city',
		options    	: officeLocations,
		style       : { flexBasis: '42%' },
		rules       : { required: 'Branch is required' },
	},

];

export default controls;
