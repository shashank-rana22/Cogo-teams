import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getMainServiceControls = () => ([
	{
		label         : 'Indicative Rate/Ctr',
		type          : 'price-select',
		name          : 'preferred_freight_rate',
		value         : { currency: GLOBAL_CONSTANTS.currency_code.USD },
		rules         : { required: 'Enter valid Rate' },
		divWidth      : '100%',
		elementStyles : { width: 'calc(50% - 12px)' },
	},
	{
		label       : 'Remarks',
		type        : 'textarea',
		name        : 'remarks',
		placeholder : 'Add any specific requirements here',
		rows        : 3,
		divWidth    : '100%',
		rules       : { required: 'Remarks is required' },
	},
]);
export default getMainServiceControls;
