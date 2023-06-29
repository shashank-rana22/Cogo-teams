import { IcMCloudUpload } from '@cogoport/icons-react';

const fields = [
	{
		name        : 'short_name',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'Short Name',
		rules       : {
			required: 'Short Name is Required',
		},
	},
	{
		name        : 'business_name',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'Business Name',
		rules       : {
			required: 'Business Name is Required',
		},
	},
	{
		name        : 'operator_type',
		type        : 'select',
		span        : 6,
		placeholder : 'Select here...',
		label       : 'Operator Type',
		options     : [
			{ label: 'Airline', value: 'airline' },
			{ label: 'Shipping Line', value: 'shipping_line' },
			{ label: 'Barge', value: 'barge' },
			{ label: 'Rail', value: 'rail' },
		],
		disabled :	false,
		rules    : {
			required: 'Operator Type is Required',
		},
	},
	{
		name        : 'iata_code',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'IATA Code',
	},
	{
		name        : 'icao_code',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'ICAO Code',
	},
	{
		name        : 'airway_bill_prefix',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'Airway Bill Prefix',
	},
	{
		name        : 'masked_name',
		type        : 'text',
		span        : 6,
		placeholder : 'Type here...',
		label       : 'Masked Name',
	},
	{
		name        : 'web_url',
		type        : 'text',
		span        : 12,
		placeholder : 'Type here...',
		label       : 'Web URL',
	},
	{
		name        : 'status',
		type        : 'select',
		span        : 6,
		placeholder : 'Select here...',
		label       : 'Status',
		options     : [
			{ label: 'Active', value: 'active' },
			{ label: 'In-active', value: 'inactive' },
		],
	},
	{
		name        : 'is_nvocc',
		type        : 'select',
		span        : 6,
		placeholder : 'Select here...',
		label       : 'Is NVOCC',
		options     : [
			{ label: 'Yes', value: 'true' },
			{ label: 'NO', value: 'false' },
		],
	},
	{
		name       : 'logo_url',
		label      : 'Logo URL',
		type       : 'file',
		drag       : true,
		span       : 12,
		maxSize    : '10485760',
		uploadType : 'aws',
		uploadIcon : <IcMCloudUpload />,
		accept     : '.png,.jpg,.jpeg',
	},
];

export default fields;
