import currencies from './Helpers/currencies';

const mawbControls = (disableClass) => ({
	basic: [
		{
			name         : 'shipperName',
			type         : 'text',
			label        : "Shipper's Name",
			className    : 'primary lg',
			showOptional : false,
			placeholder  : "Enter Shipper's name",
			span         : 5,
			value        : '',
			maxLength    : 50,
			rules        : {
				required: 'Shippers Name is Required',
			},
		},
		{
			name        : 'shipperAddress',
			className   : 'textarea',
			label       : "Shipper's Address",
			type        : 'textarea',
			span        : 7,
			maxLength   : 150,
			row         : 4,
			placeholder : 'Enter Address',
			rules       : {
				required: 'Shippers Address is Required',
			},
		},
		{
			name         : 'consigneeName',
			type         : 'text',
			className    : 'primary lg',
			label        : "Consignee's Name",
			showOptional : false,
			value        : '',
			span         : 5,
			placeholder  : "Enter Consignee's name",
			maxLength    : 50,
			rules        : {
				required: 'Consignees Name is Required',
			},
		},
		{
			name        : 'consigneeAddress',
			className   : 'textarea',
			label       : "Consignee's Address",
			type        : 'textarea',
			span        : 7,
			maxLength   : 150,
			row         : 4,
			placeholder : 'Enter Address',
			rules       : {
				required: 'Consignees Address is Required',
			},
		},
		{
			name        : 'origin',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Origin',
			placeholder : 'Enter Origin Airport',
			span        : 5,
			rules       : {
				required: 'Origin Airport is Required',
			},
		},
		{
			name        : 'destination',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Destination',
			placeholder : 'Enter Destination Airport',
			span        : 5,
			rules       : {
				required: 'Destination Airport is Required',
			},
		},
		{
			name        : 'airline',
			type        : 'text',
			className   : 'primary lg',
			label       : 'By Carrier',
			placeholder : 'Enter Airline',
			span        : 5,
			rules       : {
				required: 'Carrier is Required',
			},
		},
		{
			name        : 'paymentTerm',
			type        : 'select',
			className   : 'primary lg',
			label       : 'Shipment Type',
			placeholder : 'Shipment Type',
			options     : [
				{ value: 'prepaid', label: 'Prepaid' },
				{ value: 'collect', label: 'Collect' },
			],
			span  : 5,
			rules : {
				required: 'Freight is Required',
			},
		},
		{},
		{
			name        : 'to_one',
			type        : 'text',
			className   : 'primary lg',
			label       : 'To',
			placeholder : 'To',
			span        : 2,
		},
		{
			name        : 'by_one',
			type        : 'text',
			className   : 'primary lg',
			label       : 'By',
			placeholder : 'By',
			span        : 2,
		},
		{
			name        : 'to_two',
			type        : 'text',
			className   : 'primary lg',
			label       : 'To',
			placeholder : 'To',
			span        : 2,
		},
		{
			name        : 'by_two',
			type        : 'text',
			className   : 'primary lg',
			label       : 'By',
			placeholder : 'By',
			span        : 2,
		},
	],
	package: [
		{
			name               : 'dimension',
			label              : 'Dimensions (in cm)',
			type               : 'fieldArray',
			className          : 'primary lg',
			span               : 12,
			showButtons        : true,
			noDeleteButtonTill : 1,
			value              : [
				{
					length  : '',
					width   : '',
					height  : '',
					package : '',
					unit    : '',
				},
			],
			controls: [
				{
					name        : 'length',
					placeholder : 'Length',
					label       : 'Length',
					type        : 'number',
					className   : 'primary lg',
					span        : 1.25,
					rules       : {
						validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'width',
					placeholder : 'Width',
					label       : 'Width',
					type        : 'number',
					className   : 'primary lg',
					span        : 1.25,
					rules       : {
						validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'height',
					placeholder : 'Height',
					label       : 'Height',
					type        : 'number',
					className   : 'primary lg',
					span        : 1.5,
					rules       : {
						validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'packages_count',
					placeholder : 'Packages count',
					label       : 'Number of Packages',
					type        : 'number',
					className   : 'primary lg',
					span        : 2,
					rules       : {
						validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
					},
				}, {
					name        : 'unit',
					label       : 'Unit',
					type        : 'select',
					placeholder : 'select',
					span        : 1.25,
					options     : [
						{ label: 'Cm', value: 'cm' },
						{ label: 'Inch', value: 'inch' },
					],
				},

			],
		},
		{
			name      : 'volumetricWeight',
			type      : 'number',
			className : 'primary lg',
			label     : 'Volumetric Weight',
			span      : 5,
			rules     : {
				required: 'Volumetric Weight is Required',
			},
		},
		{
		},
		{
			name        : 'totalPackagesCount',
			placeholder : 'Package Count',
			label       : 'Package Count',
			type        : 'number',
			className   : 'primary lg',
			span        : 2,
			rules       : {
				required : true,
				validate : (value) => (value <= 0 ? 'Should be greater than 0' : true),
			},
		},
		{
			name        : 'weight',
			placeholder : 'Gross Weight',
			label       : 'Gross Weight',
			type        : 'number',
			className   : 'primary lg',
			span        : 2,
			rules       : {
				required : 'Gross Weight is Required',
				validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
			},
		},
		{
			name        : 'class',
			placeholder : 'Class',
			label       : 'Class',
			type        : 'select',
			options     : [
				{ value: 'q', label: 'Q' },
				{ value: 'a', label: 'A' },
				{ value: 'm', label: 'M' },
			],
			className : 'primary lg',
			span      : 2,
			rules     : {
				required: 'Class is Required',
			},
		},
		{
			name        : 'chargeableWeight',
			placeholder : 'Chargeable Weight',
			label       : 'Chargeable Weight',
			type        : 'number',
			className   : 'primary lg',
			span        : 2,
			rules       : {
				required : 'Chargable Weight is Required',
				validate : (value) => (value < 0 ? 'Cannot be Negative' : true),
			},
		},
		{
			name         : 'ratePerKg',
			type         : 'number',
			className    : 'primary lg',
			label        : 'Rate per Kg',
			showOptional : false,
			span         : 5,
			placeholder  : 'Rate per Kg',
			rules        : {
				required: disableClass,
			},
			disabled: disableClass,
		},
		{
			name        : 'currency',
			placeholder : 'Select Currency',
			type        : 'select',
			span        : 5,
			label       : 'Currency',
			options     : currencies,
			className   : 'primary lg',
			rules       : {
				required: 'Currency is Required',
			},
		},
		{
			name      : 'amount',
			type      : 'text',
			className : 'primary lg',
			label     : 'Amount',
			span      : 5,
			rules     : {
				required: true,
			},
		},
		{
			name        : 'remark',
			className   : 'textarea',
			label       : 'Remarks',
			type        : 'textarea',
			span        : 7,
			maxLength   : 150,
			placeholder : 'Remarks',
			rows        : 3,
		},
		{
			name               : 'agentOtherCharges',
			label              : 'Due Agent Charges',
			className          : 'primary lg',
			span               : 5,
			type               : 'fieldArray',
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
						required: 'Code is Required',
					},
				},
				{
					name        : 'price',
					placeholder : 'Enter Price',
					type        : 'text',
					span        : 5,
					rules       : {
						required: 'Price is Required',
					},
				},
			],
		},
		{
			name               : 'carrierOtherCharges',
			label              : 'Due Carrier Charges',
			className          : 'primary lg',
			span               : 5,
			type               : 'fieldArray',
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
						required: 'Code is Required',
					},
				},
				{
					name        : 'price',
					placeholder : 'Enter Price',
					type        : 'text',
					span        : 5,
					className   : 'primary lg',
					rules       : {
						required: 'Price is Required',
					},
				},
			],
		},
	],
	handling: [
		{
			name      : 'iataCode',
			type      : 'text',
			className : 'primary lg',
			label     : "Agent's Iata Code",
			span      : 5,
			rules     : {
				required: 'Iata Code is Required',
			},
		},
		{
			name      : 'accountingInformation',
			type      : 'textarea',
			className : 'textarea',
			label     : 'Accounting Information:',
			value     : 'Freight PrePaid',
			span      : 7,
			rules     : {
				required: 'Accounting Information is Required',
			},
		},
		{
			name      : 'declaredValueForCarriage',
			type      : 'text',
			className : 'primary lg',
			label     : 'Declared Value for Carriage:',
			span      : 5,
			rules     : {
				required: 'Carriage Value is Required',
			},
		},
		{
			name        : 'city',
			type        : 'text',
			className   : 'primary lg',
			span        : 5,
			label       : 'Issuing Carrier City',
			placeholder : 'City',
			rules       : {
				required: 'Carrier City is Required',
			},
		},
		{
			name         : 'valueForCustom',
			type         : 'text',
			className    : 'primary lg',
			label        : 'Declared Value for Customs:',
			showOptional : false,
			span         : 5,
			placeholder  : 'Enter Value For Custom',
		},
		{
			name         : 'handlingInformation',
			type         : 'textarea',
			className    : 'textarea',
			label        : 'Handling Information:',
			showOptional : false,
			span         : 5,
			placeholder  : 'Handling Information...*',
			maxLength    : 100,
			rules        : {
				required: 'Handling Information is Required',
			},
		},
		{
			name        : 'commodity',
			label       : 'Commodity Details:',
			type        : 'textarea',
			className   : 'textarea',
			span        : 5,
			maxLength   : 300,
			placeholder : 'Commodity...',
			rows        : 3,
			rules       : {
				required: 'Commodity is Required',
			},
		},
		{
			name        : 'agentName',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Agent Name',
			span        : 5,
			placeholder : 'Agent Name',
			rules       : {
				required: 'Agent Name is Required',
			},
		},
		{
			name        : 'place',
			type        : 'text',
			className   : 'primary lg',
			label       : 'At Place',
			span        : 5,
			placeholder : 'Place',
			rules       : {
				required: 'Place is Required',
			},
		},
		{
			name        : 'shipperSignature',
			type        : 'text',
			className   : 'primary lg',
			label       : 'Signature of Shipper or his Agent',
			span        : 5,
			placeholder : 'Shipper Signature',
			rules       : { required: 'Shipper Signature is Required' },
		},
	],
});

export default mawbControls;
