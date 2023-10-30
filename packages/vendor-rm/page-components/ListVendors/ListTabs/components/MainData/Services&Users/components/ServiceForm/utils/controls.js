import { startCase } from '@cogoport/utils';

import { EXCLUDE_CATEGORIES } from '../../../../../../../constants';

const getControls = ({ pocOptions, country_id = '' }) => [
	{
		name               : 'category',
		label              : 'Select Category',
		type               : 'asyncSelect',
		placeholder        : 'Select a Category',
		asyncKey           : 'list_expense_category',
		initialCall        : true,
		renderLabel        : (item) => startCase(item.categoryName),
		// eslint-disable-next-line max-len
		getModifiedOptions : ({ options }) => (options?.filter(({ categoryName = '' }) => (!EXCLUDE_CATEGORIES.includes(categoryName)))),
		valueKey           : 'categoryName',
		style              : { flexBasis: '46%', marginRight: '20px' },
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
	{
		name        : 'poc_id',
		label       : 'Select POC',
		type        : 'select',
		placeholder : 'Select a POC',
		options     : pocOptions,
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'POC is required' },
	},
];

export default getControls;
