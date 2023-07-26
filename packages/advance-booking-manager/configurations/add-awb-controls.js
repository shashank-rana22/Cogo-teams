import checkValidation from '../utils/checkValidation';

const ALLOWED_TOTAL_AWB_ALLOTED = 200;

const awbControls = ({
	setServiceProviderData,
	serviceProviderData,
}) => [
	{
		name        : 'airline_id',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Select Airline',
		placeholder : 'Select Airline...',
		initialCall : true,
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'airport_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name                  : 'validity_expiry_date',
		type                  : 'date_picker',
		label                 : 'AWB Validity',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
		rules                 : {
			required: true,
		},
	},
	{
		name                  : 'procured_date',
		type                  : 'date_picker',
		label                 : 'Procured Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
		rules                 : {
			required: true,
		},
	},
	{
		name        : 'first_awb_number',
		type        : 'text',
		label       : 'AWB Number',
		placeholder : 'xxx-xxxx-xxxx',
		maxLength   : 13,
		span        : 6,
		rules       : {
			required : true,
			validate : (value) => checkValidation(value),
		},
	},
	{
		name        : 'number_of_awb_alloted',
		type        : 'number',
		label       : 'Total AWB Numbers Alloted',
		span        : 6,
		placeholder : 'Enter',
		rules       : {
			required : true,
			validate : (value) => (value > ALLOWED_TOTAL_AWB_ALLOTED ? 'Cannot be more than 200' : true),
		},
	},
	{
		name        : 'service_provider_id',
		type        : 'async-select',
		asyncKey    : 'organizations',
		label       : 'Service Provider',
		span        : 6,
		placeholder : 'Service Provider',
		onChange    : (val, obj) => setServiceProviderData(obj),
		params      : {
			filters: {
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
				service_type : 'air_freight',
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'procured_by_id',
		type        : 'async-select',
		asyncKey    : 'partner_users',
		label       : 'Procured by Cogoport Agent',
		placeholder : 'Search via name/email',

		span   : 6,
		params : {
			filters: {
				partner_id: serviceProviderData?.partner_id,
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'awb_type',
		type        : 'select',
		label       : 'Type of AWB',
		placeholder : 'Select Adhoc/Advance',
		span        : 6,
		rules       : {
			required: true,
		},
		options: [
			{
				label : 'Adhoc',
				value : 'adhoc',
			},
			{
				label : 'Advance',
				value : 'advance',
			},
		],
	},
];

export default awbControls;
