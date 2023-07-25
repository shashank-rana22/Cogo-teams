import currencies from '../../../../helpers/currencies';

const getControls = ({ item = {} }) => ({
	commonControls: [
		{
			name                  : 'cargo_readiness_date',
			label                 : 'Cargo Readiness Date',
			style                 : { width: '30%' },
			type                  : 'single-date-picker',
			isPreviousDaysAllowed : false,
			rules                 : {
				required: 'Cargo Readiness Date is required',
			},
		},
	],

	restControls: [
		{
			name             : `${item?.container_size}_${item?.commodity}`,
			type             : 'fieldArray',
			showButtons      : false,
			showDeleteButton : false,
			value            : [
				{
					container            : item?.container_size,
					cargo_value          : item?.cargo_value,
					cargo_value_currency : item?.cargo_value_currency,
					hs_code_id           : item?.hs_code_id,
					commercial_invoice   : item?.commercial_invoice_url,
					container_count      : item?.containers_count,
				},
			],
			controls: [
				{
					name         : 'container',
					type         : 'select',
					label        : 'Container size',
					showOptional : false,
					disabled     : true,
					style        : { width: '20%' },
					options      : [
						{
							label : `${item?.container_size} ft`,
							value : item?.container_size,
						},
					],
				},
				{
					name         : 'container_count',
					type         : 'number',
					label        : 'Container Count',
					style        : { width: '25%' },
					showOptional : false,
					disabled     : true,
				},
				{
					name        : 'cargo_value_currency',
					classname   : 'sm',
					label       : 'Currency',
					placeholder : 'Enter',
					type        : 'select',
					style       : { width: '12%' },
					options     : currencies,
					rules       : {
						required: 'this is Required',
					},
				},
				{
					name        : 'cargo_value',
					classname   : 'sm',
					label       : 'Cargo Value',
					placeholder : 'Enter',
					type        : 'number',
					style       : { width: '18%' },
					rules       : {
						required: 'this is Required',
					},
				},
				{
					label       : 'HS Code',
					name        : 'hs_code_id',
					type        : 'async-select',
					asyncKey    : 'list_saas_hs_codes',
					placeholder : 'Select',
					style       : { width: '25%' },
					rules       : { required: 'hsCode is required' },
				},
				{
					name    : 'commercial_invoice',
					label   : 'Upload Commerical invoice',
					maxSize : '10485760',
					type    : 'file-uploader',
					drag    : true,
					style   : { width: '50%' },
					rules   : { required: 'This is required' },
				},
			],
		},
	],
});
export default getControls;
