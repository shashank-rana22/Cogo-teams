import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getCustomsControls = () => ([
	{
		label       : 'Select HS Code for Customs Rate',
		name        : 'hs_code_id',
		type        : 'async-select',
		asyncKey    : 'list_saas_hs_codes',
		placeholder : 'Select',
		divWidth    : 'calc(50% - 12px)',
		rules       : { required: 'hsCode is required' },
	},
	{
		label    : 'Indicative Rate/Ctr',
		type     : 'price-select',
		name     : 'preferred_freight_rate',
		value    : { currency: GLOBAL_CONSTANTS.currency_code.USD },
		rules    : { required: 'Enter valid Rate' },
		divWidth : 'calc(50% - 12px)',
	},
	{
		label       : 'Remarks',
		type        : 'textarea',
		name        : 'remarks',
		placeholder : 'Add any specific requirements here',
		rules       : { required: 'Remarks is required' },
		rows        : 3,
		divWidth    : '100%',
	},
]);
export default getCustomsControls;
