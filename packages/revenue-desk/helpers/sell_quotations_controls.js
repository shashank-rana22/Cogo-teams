import { isEmpty, startCase } from '@cogoport/utils';

const CHECK_LENGTH = 3;

const rawControls = (
	{
		handleChange,
		service,
		index,
		info,
		shipment_data,
		trade_mapping = {},
	},
) => {
	const [codeOptions, unitOptions, currencyOptions] = ['code', 'unit', 'currency']
		.map((key) => service.line_items.map((item) => ({ label: startCase(item[key]), value: item[key] })));
	return {
		type       : 'fieldArray',
		name       : `${service?.service_id}:${index}`,
		subType    : 'edit_service',
		showHeader : true,
		buttonText : 'Add Line Item',
		heading    : startCase(
			`${
				(`${shipment_data?.shipment_type}_service` !== service?.service_type
			&& trade_mapping[service?.trade_type])
		|| ''
			} - ${service?.service_type}`,
		),
		showButtons        : false,
		noDeleteButtonTill : 100000,
		value              : [
			{
				code             : '',
				alias            : '',
				sac_code         : '',
				currency         : '',
				price_discounted : '',
				quantity         : '',
				exchange_rate    : '',
				tax              : '',
				total            : '',
			},
		],
		controls: [
			{
				label       : 'code',
				type        : 'select',
				name        : 'code',
				span        : 2,
				handleChange,
				options     : codeOptions,
				placeholder : 'select line item',
				disabled    : true,
				rules       : { required: 'Required' },
			},
			{
				label: (
					<>
						<div>Alias Name</div>
						{info}
					</>
				),
				type        : 'text',
				name        : 'alias',
				placeholder : 'Enter alias name/code',
				rules       : {
					validate: (v) => v?.length >= CHECK_LENGTH || isEmpty(v) || 'Characters should be >= 3',
				},
				disabled : true,
				span     : 2,
			},
			{
				label       : 'Unit',
				type        : 'select',
				name        : 'unit',
				placeholder : 'select...',
				disabled    : true,
				options     : unitOptions,
				span        : 1.5,
			},
			{
				name           : 'currency',
				label          : 'Currency',
				type           : 'select',
				showOptional   : false,
				className      : 'size-sm',
				optionsListKey : 'currencies',
				placeholder    : 'Select Currency',
				rules          : { required: 'currency is required' },
				options        : currencyOptions,
				span           : 1.5,
				disabled       : true,
			},
			{
				label       : 'Price',
				name        : 'price_discounted',
				type        : 'number',
				placeholder : 'enter price',
				span        : 1.5,
				rules       : {
					required: 'Required',
				},
				disabled: true,
			},
			{
				label       : 'Quantity',
				name        : 'quantity',
				type        : 'number',
				placeholder : 'enter quantity',
				rules       : { required: 'Required', min: 1 },
				span        : 1,
				disabled    : true,
			},
			{
				label    : 'Amount (Tax Excl.)',
				type     : 'text',
				name     : 'total',
				span     : 1.5,
				disabled : true,
			},
		],
	};
};

export default rawControls;
