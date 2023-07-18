import CustomSelectOption from '../../../../../../common/CustomSelectOption';

import CURRENCY_CODE_OPTIONS from './currency-options';

const renderLabel = (option) => CustomSelectOption({ option, key: 'airlines' });

const airFeedbackControls = [
	{
		name    : 'preferred_freight_rate_currency',
		label   : 'Currency',
		type    : 'select',
		options : CURRENCY_CODE_OPTIONS,
		span    : 4,
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative Rate',
		type  : 'number',
		span  : 4,
	},
	{
		name  : 'cargo_readiness_date',
		label : 'Cargo Ready Date',
		type  : 'datepicker',
		span  : 4,
		rules : { required: true },
	},
	{
		name        : 'preferred_airline_ids',
		label       : 'Preferred Air lines',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		initialCall : true,
		renderLabel,
		multiple    : true,
		placeholder : "Enter preferred airline line only if customer won't accept any other line",
		span        : 12,
		rules       : { required: true },
	},
	{
		name        : 'remarks',
		type        : 'textarea',
		label       : 'Remarks',
		placeholder : 'Please add preferred sailing date and other specific requirements...',
		span        : 12,
		rules       : { required: true },
	},
];
export default airFeedbackControls;
