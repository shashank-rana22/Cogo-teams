import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getControl = ({ services }) => {
	const trukObjects = (services || []).reduce(
		(acc, item) => {
			if (item?.service_type !== 'subsidiary_service') {
				acc.truckOptions.push({ label: item?.truck_number, value: item?.id });
				acc.initialValues.push({ truck_number: item?.id });
			}
			return acc;
		},
		{ truckOptions: [], initialValues: [] },
	);

	const control = [
		{
			name     : 'documents',
			type     : 'fieldArray',
			value    : trukObjects.initialValues,
			controls : [
				{
					name    : 'truck_number',
					span    : 2.2,
					type    : 'select',
					label   : 'Truck Number',
					options : trukObjects.truckOptions,
					rules   : {
						required: {
							value: true,
							message:
								'Truck Number is required, please add truck numbers to this shipment',
						},
					},
				},
				{
					name  : 'eway_bill_number',
					span  : 2.2,
					type  : 'text',
					label : 'Eway Bill Number',
					rules : {
						pattern: {
							value   : GLOBAL_CONSTANTS.regex_patterns.eway_bill_number,
							message : 'eway bill no. is invlaid',
						},
					},
				},
				{
					name           : 'eway_bill_generation_date',
					span           : 2.2,
					type           : 'datepicker',
					label          : 'EWB Generation Date',
					showTimeSelect : true,
					width          : 3,
					conditions     : [
						{
							value      : 'data.pickup_date',
							elseValue  : null,
							key_to_add : 'value',
						},
					],
					placeholder: 'Select',
				},
				{
					name           : 'ewb_validity',
					span           : 2.2,
					type           : 'datepicker',
					label          : 'Eway bill validity',
					showTimeSelect : true,
					width          : 3,
					conditions     : [
						{
							value      : 'data.pickup_date',
							elseValue  : null,
							key_to_add : 'value',
						},
					],
					placeholder: 'Select',
				},
				{
					name  : 'description',
					rows  : 7,
					span  : 3,
					type  : 'textarea',
					label : 'Remarks',
				},
				{
					name  : 'url',
					span  : 3,
					type  : 'file',
					label : 'Document',
					rules : {
						required: {
							value   : true,
							message : 'This is required',
						},
					},
				},
			],
			showButtons      : true,
			showDeleteButton : true,
		},
	];

	return control;
};

export default getControl;
