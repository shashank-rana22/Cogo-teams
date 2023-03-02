import { FilterItem } from '../../interfaces';

export const filterControls: FilterItem[] = [
	{
		name        : 'serviceName',
		placeholder : 'Service',
		type        : 'select',
		isClearable : true,
		options     : [
			{
				label : 'Organization',
				value : 'ORGANIZATION',
			},
			{
				label : 'Business Finance',
				value : 'BUSINESS_FINANCE',
			},
			{
				label : 'Common',
				value : 'COMMON',
			},
			{
				label : 'Admin UI',
				value : 'ADMIN_UI',
			},
			{
				label : 'Public UI',
				value : 'PUBLIC_UI',
			},
		],
	},
	{
		name        : 'targetLanguage',
		placeholder : 'Target Language',
		type        : 'select',
		isClearable : true,
		options     : [
			{
				label : 'HINDI',
				value : 'HI',
			},
			{
				label : 'VIETNAMESE',
				value : 'VI',
			},
			{
				label : 'ENGLISH',
				value : 'EN',
			},
		],
	},
];
