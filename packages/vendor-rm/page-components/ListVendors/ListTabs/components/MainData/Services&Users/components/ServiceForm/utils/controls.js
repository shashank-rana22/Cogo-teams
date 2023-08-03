import { startCase } from '@cogoport/utils';

import officeLocations from '../../../../../../../../../utils/office-locations.json';
import { EXCLUDE_CATEGORIES } from '../../../../../../../constants';

const getControls = ({ pocOptions }) => [
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
		name        : 'cogoport_office_id',
		label       : 'Select Cogoport Office',
		type        : 'select',
		placeholder : 'Select Location',
		options     : officeLocations,
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
