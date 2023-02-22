const mawbControls = () => ({
	basic: [
		{
			name         : 'shipper_name',
			type         : 'text',
			label        : "Shipper's Name",
			className    : 'primary lg',
			showOptional : false,
			placeholder  : "Shipper's name*",
			span         : 5,
			value        : '',
			maxLength    : 50,
			rules        : {
				require: 'Shippers Name is Required',
			},
		},
		{
			name        : 'shipper_address',
			className   : 'textarea',
			label       : "Shipper's Address:",
			type        : 'textarea',
			span        : 7,
			maxLength   : 150,
			row         : 4,
			placeholder : 'Address...',
			rules       : {
				require: 'Shippers Address is Required',
			},
		},
		{
			name         : 'consignee_name',
			type         : 'text',
			className    : 'primary lg',
			label        : "Consignee's Name",
			showOptional : false,
			value        : '',
			span         : 5,
			placeholder  : "Consignee's name*",
			maxLength    : 50,
			rules        : {
				require: 'Consignees Name is Required',
			},
		},
		{
			name        : 'consignee_address',
			className   : 'textarea',
			label       : "Consignee's Address:",
			type        : 'textarea',
			span        : 7,
			maxLength   : 150,
			row         : 4,
			placeholder : 'Address...',
			rules       : {
				require: 'Consignees Address is Required',
			},
		},
		{
			name        : 'origin_airport',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Origin:',
			placeholder : 'Enter Origin Airport',
			span        : 5,
			rules       : {
				require: 'Origin Airport is Required',
			},
		},
		{
			name        : 'destination_airport',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Destination:',
			placeholder : 'Enter Destination Airport',
			span        : 5,
			rules       : {
				require: 'Destination Airport is Required',
			},
		},
	],
	package: [
		{
			name      : 'iata_code',
			type      : 'text',
			className : 'primary lg',
			label     : "Agent's Iata Code:*",
			value     : '14-3-4525/0005',
			span      : 5,
			rules     : {
				require: 'Iata Code is Required',
			},
		},
		{
			name      : 'accounting_information',
			type      : 'textarea',
			className : 'textarea',
			label     : 'Accounting Information:',
			value     : 'Freight PrePaid',
			span      : 7,
			rules     : {
				require: 'Accounting Information is Required',
			},
		},
		{
			name      : 'declared_value_for_carriage',
			type      : 'text',
			className : 'primary lg',
			label     : 'Declared Value for Carriage:',
			value     : 'NVD',
			span      : 5,
			rules     : {
				require: 'Carriage Value is Required',
			},
		},
		{
			name        : 'city',
			type        : 'text',
			className   : 'primary lg',
			span        : 5,
			label       : 'Issuing Carrier City:*',
			value       : 'NEW DELHI',
			placeholder : 'City...',
			rules       : {
				require: 'Carrier City is Required',
			},
		},
		{
			name         : 'value_for_custom',
			type         : 'text',
			className    : 'primary lg',
			label        : 'Declared Value for Customs:',
			showOptional : false,
			span         : 5,
			placeholder  : 'Enter Value For Custom',
		},
		{
			name         : 'handling_information',
			type         : 'text',
			className    : 'primary lg',
			label        : 'Handling Information:',
			showOptional : false,
			span         : 5,
			placeholder  : 'Handling Information...*',
			maxLength    : 100,
			rules        : {
				require: 'Handling Information is Required',
			},
		},
		{
			name         : 'rate_per_kg',
			type         : 'number',
			className    : 'primary lg',
			label        : 'Rate per Kg',
			showOptional : false,
			span         : 5,
			placeholder  : 'Rate per Kg',
			rules        : {
				require: 'Rate is Required',
			},
		},
		{
			name        : 'currency',
			placeholder : 'Select Currency',
			type        : 'select',
			span        : 5,
			label       : 'Currency',
			options     : [
				{ value: 'USD', label: 'USD' },
				{ value: 'INR', label: 'INR' },
				{ value: 'EUR', label: 'EUR' },
				{ value: 'GBP', label: 'GBP' },
			],
			className : 'primary lg width',
			rules     : {
				require: 'Currency is Required',
			},
		},
		{
			name               : 'agent_other_charges',
			label              : 'Other Charges Due Agent',
			className          : 'primary lg',
			type               : 'fieldArray',
			showOptional       : false,
			showButtons        : true,
			noDeleteButtonTill : 1,
			value              : [
				{
					code  : '',
					price : '',
				},
			],
			controls: [
				{
					name        : 'code',
					type        : 'text',
					className   : 'primary lg',
					span        : 5,
					placeholder : 'Enter Code',
					rules       : {
						require: 'Code is Required',
					},
				},
				{
					name        : 'price',
					placeholder : 'Enter Price',
					type        : 'number',
					span        : 5,
					rules       : {
						require: 'Price is Required',
					},
				},
			],
		},
		{
			name               : 'carrier_other_charges',
			label              : 'Other Charges Due Carrier',
			className          : 'primary lg',
			type               : 'fieldArray',
			showOptional       : false,
			showButtons        : true,
			noDeleteButtonTill : 1,
			value              : [
				{
					code  : '',
					price : '',
				},
			],
			controls: [
				{
					name        : 'code',
					type        : 'text',
					className   : 'primary lg',
					span        : 2.5,
					placeholder : 'Enter Code',
					rules       : {
						require: 'Code is Required',
					},
				},
				{
					name        : 'price',
					placeholder : 'Enter Price',
					type        : 'number',
					span        : 2.5,
					className   : 'primary lg',
					rules       : {
						require: 'Price is Required',
					},
				},
			],
		},
		{
			name               : 'dimension',
			label              : 'Dimensions (in cm)',
			type               : 'fieldArray',
			className          : 'primary lg',
			showOptional       : false,
			showButtons        : true,
			noDeleteButtonTill : 1,
			span               : 4,
			value              : [
				{
					length  : '',
					breadth : '',
					height  : '',
					package : '',
				},
			],
			controls: [
				{
					name        : 'length',
					placeholder : 'Length',
					label       : 'Length',
					type        : 'number',
					className   : 'primary lg',
					span        : 2,
					rules       : {
						require  : 'Length is Required',
						validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'width',
					placeholder : 'Width',
					label       : 'Width',
					type        : 'number',
					className   : 'primary lg',
					span        : 2,
					rules       : {
						require  : 'Width is Required',
						validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'height',
					placeholder : 'Height',
					label       : 'Height',
					type        : 'number',
					className   : 'primary lg',
					span        : 2,
					rules       : {
						require  : 'Height is Required',
						validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'packages',
					placeholder : 'No of Packages',
					label       : 'Number of Packages',
					type        : 'number',
					className   : 'primary lg',
					span        : 2,
					rules       : {
						require  : 'No of Packages is Required',
						validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
			],
		},
		{
			name        : 'remark',
			className   : 'primary lg',
			label       : 'Remarks:',
			type        : 'textarea',
			span        : 5,
			maxLength   : 150,
			placeholder : 'Remarks...',
			rows        : 3,
			rules       : {
				require: 'Remarks is Required',
			},
		},
		{
			name        : 'commodity',
			className   : 'primary lg',
			label       : 'Commodity Details:',
			type        : 'textarea',
			span        : 5,
			maxLength   : 300,
			placeholder : 'Commodity...',
			rows        : 3,
			rules       : {
				require: 'Commodity is Required',
			},
		},
		{
			name         : 'place',
			type         : 'text',
			className    : 'primary lg input_place',
			showOptional : false,
			value        : 'NEW DELHI',
			label        : 'At Place:',
			placeholder  : 'Place',
			rules        : {
				require: 'Place is Required',
			},
		},
	],
});

export default mawbControls;
