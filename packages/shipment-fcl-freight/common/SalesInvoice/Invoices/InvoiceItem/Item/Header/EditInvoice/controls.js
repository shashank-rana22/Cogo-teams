import { startCase, isEmpty } from "@cogoport/utils";

const trade_mapping = {
    import: 'Destination',
    export: 'Origin',
};

const controls = ({shipment_data = {} , charge = {}}) => {
    const control = [
		{
			label: startCase(
				`${
					(`${shipment_data?.shipment_type}_service` !== charge?.service_type &&
						trade_mapping[charge?.trade_type]) ||
					''
				} - ${charge?.service_type}`,
			),
			type: 'select',
			name: 'code',
			span: 2,
			// handleChange,
			placeholder: 'select line item',
			// disabled:
			// 	handleDisableCond(charge, isFclFreight, shipment_data) ||
			// 	(isAirFreight && !isAuthorised),
			rules: { required: 'Required' },
		},
		{
			label: (
				<>
					<div>Alias Name</div>
					{/* {info} */}
				</>
			),
			type: 'text',
			name: 'alias',
			placeholder: 'Enter alias name/code',
			rules: {
				validate: (v) =>
					v?.length >= 3 || isEmpty(v) || 'Characters should be >= 3',
			},
			// disabled: handleDisableCond(charge, isFclFreight, shipment_data),
			span: 2,
		},
		{
			label: 'Unit',
			type: 'select',
			name: 'unit',
			placeholder: 'select...',
			options: [],
			// disabled:
			// 	handleDisableCond(charge, isFclFreight, shipment_data) ||
			// 	(isAirFreight && !isAuthorised),
			span: 1.5,
		},
		{
			name: 'currency',
			label: 'Currency',
			type: 'select',
			showOptional: false,
			className: 'size-sm',
			optionsListKey: 'currencies',
			placeholder: 'Select Currency',
			rules: { required: 'currency is required' },
			span: 1.5,
			// disabled:
			// 	handleDisableCond(charge, isFclFreight, shipment_data) ||
			// 	(isAirFreight && !isAuthorised),
		},
		{
			label: 'Price',
			name: 'price_discounted',
			type: 'number',
			placeholder: 'enter price',
			span: 1.5,
			rules: {
				required: 'Required',
				validate: (v) => v > 0 || 'Price must be greater than 0',
			},
			// disabled: handleDisableCond(charge, isFclFreight, shipment_data),
		},
		{
			label: 'Quantity',
			name: 'quantity',
			type: 'number',
			placeholder: 'enter quantity',
			rules: { required: 'Required', min: 1 },
			span: 1,
			// disabled:
			// 	handleDisableCond(charge, isFclFreight, shipment_data) ||
			// 	(isAirFreight && !isAuthorised),
		},
		{
			label: 'Amount (Tax Excl.)',
			type: 'static',
			name: 'total',
			span: 1.5,
			render: (item) => <p className="amount-excl">{item?.total}</p>,
		},
	];
    return control;
}

export default controls;