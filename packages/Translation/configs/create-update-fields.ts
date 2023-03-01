import { ControlProps, SingleData } from '../common/interfaces';

interface Props {
	status: string;
	row: SingleData;
}

export const controls: ControlProps = ({ status, row }:Props) => [
	{
		name        : 'serviceName',
		label       : 'Service Name',
		type        : 'select',
		placeholder : 'Select Service Name',
		isClearable : true,
		span        : 6,
		value       : row?.serviceName,
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
		rules: { required: 'Service Name is required' },
	},
	{
		name        : 'targetLanguage',
		label       : 'Target Language',
		type        : 'select',
		span        : 5.5,
		value       : row?.targetLanguage,
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
		placeholder : 'Choose Language',
		rules       : { required: 'Language is required' },
	},
	{
		name        : 'subModule',
		label       : 'Sub Module',
		placeholder : 'Sub Module',
		value       : row?.subModule,
		span        : 12,
		type        : 'text',
		rules       : { required: 'Sub Module is required' },
	},
	{
		name        : 'text',
		label       : 'Text',
		type        : 'textArea',
		value       : row?.text,
		size        : 'lg',
		span        : status === 'COMPLETED' ? 6 : 12,
		style       : { minHeight: '100px' },
		placeholder : 'Enter Text',
		rules       : { required: 'Text is required' },
	},
	{
		name        : 'translatedText',
		label       : 'Enter Translated Text',
		type        : 'textArea',
		size        : 'lg',
		span        : 5.5,
		style       : { minHeight: '100px' },
		placeholder : 'Enter Translated Text',
		value       : row?.translatedText,
		rules       : { required: 'Translated Text is required' },
		show        : status === 'COMPLETED',
	},
];
