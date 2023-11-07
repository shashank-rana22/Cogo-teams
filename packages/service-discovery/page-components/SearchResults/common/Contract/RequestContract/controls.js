import CustomSelectOption from '../../../../../common/CustomSelectOption';
import validate from '../../../utils/validateNumber';

const getParams = ({ status, operator_type }) => ({
	filters    : { operator_type, status },
	page_limit : 100,
	sort_by    : 'short_name',
	sort_type  : 'asc',
});

const renderAirlinesLabel = (data) => CustomSelectOption({ data, key: 'airlines' });

const createContracts = ({ isMobile = false, minCargoValues = {} }) => {
	const {
		fcl_freight: { min: minContainerCount },
		air_freight: { min: minWeight },
	} = minCargoValues;

	return [
		{
			name        : 'contract_name',
			label       : 'Contract Name',
			type        : 'text',
			placeholder : 'Name of Contract',
			span        : 12,
			showIn      : ['fcl_freight', 'air_freight', 'lcl_freight'],
			rules       : { required: 'Contract name is required' },
		},
		{
			name        : 'validity_start',
			label       : 'Validity (Max 30 Days)',
			type        : 'datepicker',
			placeholder : 'Start Date ',
			span        : 6,
			showIn      : ['fcl_freight', 'air_freight', 'lcl_freight'],
			rules       : { required: 'Start date required' },
		},
		{
			name                  : 'validity_end',
			type                  : 'datepicker',
			placeholder           : ' End Date',
			isPreviousDaysAllowed : true,
			span                  : 6,
			showIn                : ['fcl_freight', 'air_freight', 'lcl_freight'],
			rules                 : { required: 'End date required' },
		},
		{
			name        : 'max_containers_count',
			label       : 'Container Count',
			type        : 'number',
			placeholder : 'Count',
			min         : 0,
			span        : 4,
			showIn      : ['fcl_freight', 'lcl_freight'],
			rules       : { required: 'Container count is required', min: Number(minContainerCount) },
		},
		{
			name   : 'max_weight',
			label  : 'Maximum Weight',
			type   : 'input',
			min    : 0,
			span   : isMobile ? 12 : 4,
			suffix : <span style={{ marginRight: 12 }}>Kgs</span>,
			showIn : ['air_freight', 'lcl_freight'],
			rules  : {
				required : 'Maximum weight is required',
				min      : Number(minWeight),
				validate : (val) => validate(val),
			},
		},
		{
			name         : 'preferred_shipping_line_ids',
			label        : 'Preferred Shipping Line',
			type         : 'async-select',
			asyncKey     : 'list_operators',
			showOptional : true,
			initialCall  : true,
			params       : getParams({
				status        : 'active',
				operator_type : 'shipping_line',
			}),
			defaultOptions : true,
			labelKey       : 'short_name',
			isClearable    : true,
			caret          : false,
			multiple       : true,
			span           : isMobile ? 12 : 4,
			showIn         : ['fcl_freight'],
		},
		{
			name         : 'preferred_shipping_line_ids',
			label        : 'Prefered Airlines',
			type         : 'async-select',
			asyncKey     : 'list_operators',
			showOptional : true,
			initialCall  : true,
			params       : getParams({
				status        : 'active',
				operator_type : 'airline',
			}),
			defaultOptions : true,
			labelKey       : 'short_name',
			isClearable    : true,
			multiple       : true,
			span           : isMobile ? 12 : 4,
			showIn         : ['air_freight'],
			renderLabel    : renderAirlinesLabel,
		},
		{
			name           : 'exclude_shipping_line_ids',
			label          : 'Unprefered Airlines',
			type           : 'async-select',
			asyncKey       : 'list_operators',
			initialCall    : true,
			labelKey       : 'short_name',
			showOptional   : true,
			defaultOptions : false,
			params         : getParams({
				status        : 'active',
				operator_type : 'airline',
			}),
			isClearable : true,
			multiple    : true,
			span        : isMobile ? 12 : 4,
			showIn      : ['air_freight'],
			renderLabel : renderAirlinesLabel,
		},
		{
			name           : 'exclude_shipping_line_ids',
			label          : 'Exclude Shipping Line',
			type           : 'async-select',
			asyncKey       : 'list_operators',
			initialCall    : true,
			labelKey       : 'short_name',
			showOptional   : true,
			defaultOptions : false,
			params         : getParams({
				status        : 'active',
				operator_type : 'shipping_line',
			}),
			isClearable : true,
			multiple    : true,
			span        : 4,
			showIn      : ['fcl_freight'],
		},
	];
};

export default createContracts;
