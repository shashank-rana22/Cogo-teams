import { startCase } from '@cogoport/utils';

import { EXCLUDE_CATEGORIES } from '../../../ListVendors/constants';

const controls = ({ entityCode, country_id = '' }) => [
	{
		name               : 'services',
		label              : 'Office Details',
		type               : 'fieldArray',
		buttonText         : 'Add',
		noDeleteButtonTill : 1,
		showLabelOnce      : true,
		controls           : [
			{
				name               : 'category',
				label              : 'Select Category',
				type               : 'asyncSelect',
				asyncKey           : 'list_expense_category',
				initialCall        : true,
				placeholder        : 'Select a Category',
				valueKey           : 'categoryName',
				renderLabel        : (item) => startCase(item.categoryName),
				// eslint-disable-next-line max-len
				getModifiedOptions : ({ options }) => (options?.filter(({ categoryName = '' }) => (!EXCLUDE_CATEGORIES.includes(categoryName)))),
				style              : { flexBasis: '30%' },
				params             : { entityCode },
				rules              : { required: 'Category is required' },
			},
			{
				name        : 'country_id',
				label       : 'Country of Registration',
				type        : 'asyncSelect',
				params      : { filters: { type: ['country'] } },
				asyncKey    : 'list_locations',
				placeholder : 'Select a Country',
				style       : { flexBasis: '30%' },
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
				style       : { flexBasis: '30%' },
				rules       : { required: 'Office Location is required' },
				multiple    : true,
			},
		],
	},
];

export default controls;
