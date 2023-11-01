import { startCase } from '@cogoport/utils';

import workScopes from '../../../../../../../../../utils/work-scopes.json';
import { EXCLUDE_CATEGORIES } from '../../../../../../../constants';

const controls = ({ country_id = '' }) => [
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
		name               : 'category',
		label              : 'Category',
		type               : 'asyncSelect',
		placeholder        : 'Select Category',
		asyncKey           : 'list_expense_category',
		renderLabel        : (item) => startCase(item.categoryName),
		// eslint-disable-next-line max-len
		getModifiedOptions : ({ options }) => (options?.filter(({ categoryName = '' }) => (!EXCLUDE_CATEGORIES.includes(categoryName)))),
		valueKey           : 'categoryName',
		style              : { flexBasis: '42%' },
		rules              : { required: 'Category is required' },

	},
	{

		name        : 'country_id',
		label       : 'Country of Registration',
		type        : 'asyncSelect',
		params      : { filters: { type: ['country'] } },
		asyncKey    : 'list_locations',
		placeholder : 'Select a Country',
		style       : { flexBasis: '46%' },
		condition   : { type: ['country'] },
		rules       : { required: 'Country is required' },
	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Cogoport Office',
		type        : 'asyncSelect',
		params      : { filters: { type: ['city'], country_id } },
		renderLabel : (item) => `${item?.name}`,
		asyncKey    : 'list_locations',
		placeholder : 'Select Location',
		condition   : { type: ['city'] },
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'Office Location is required' },
	},
];

export default controls;
