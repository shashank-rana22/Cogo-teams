import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const getControl = ({ setCommodity }) => [
	{
		label              : 'Commodity',
		name               : 'cargo_insurance_commodity',
		type               : 'async-select',
		asyncKey           : 'insurance_commodities',
		initialCall        : true,
		placeholder        : 'Select Commodity',
		rules              : { required: 'Commodity is required' },
		span               : 12,
		labelKey           : 'display_name',
		getModifiedOptions : ({ options }) => options.map((opt) => ({
			...opt,
			display_name: (
				<div>
					{opt?.commodity}
					(
					{opt?.subCommodity}
					)

				</div>),
		})),
		onChange: (e, commodity) => {
			setCommodity(commodity);
		},
	},
	{
		name  : 'cargo_insurance_commodity_description',
		label : 'Commodity Description',
		type  : 'text',
		span  : 12,
		rules : { required: 'Commodity Description is required' },
	},
	{
		name           : 'cargo_value_currency',
		label          : 'Currency',
		type           : 'select',
		span           : 4,
		optionsListKey : 'currencies',
		value          : `${geo?.country?.currency.code}`,
		validations    : [{ type: 'required', message: 'Currency is required' }],
	},
	{
		name  : 'cargo_value',
		label : 'Consignment Value',
		type  : 'number',
		span  : 8,
		rules : {
			required: {
				message: 'Consignment Value is Required',
			},
			min: {
				value   : 0,
				message : 'Consignment Value cannot be negative',
			},
		},
	},
];
export default getControl;
