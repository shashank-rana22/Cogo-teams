function addOneDay(date) {
	date.setDate(date.getDate() + 1);
	return date;
}

const controls = ({ validity_start_date = '', setValue = () => {} }) => [
	{
		name        : 'organization_id',
		type        : 'async_select',
		asyncKey    : 'organizations',
		label       : 'Organization Name',
		span        : 12,
		placeholder : 'Select organization',
		initialCall : true,
		params      : {
			filters: {
				account_type : 'importer_exporter',
				status       : 'active',
				kyc_status   : 'verified',
			},
		},
		rules: { required: 'Organization id is required' },
	},
	{
		name            : 'agreement_url',
		showProgress    : true,
		onlyURLOnChange : true,
		accept:
'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		type   : 'file',
		drag   : true,
		label  : 'Agreement with Cogoport',
		span   : 12,
		height : 44,
		rules  : {
			required: 'Please Upload the Agreement',
		},
	},
	{
		name                  : 'validity_start_date',
		label                 : 'Validity Start Date',
		type                  : 'date',
		span                  : 6,
		rules                 : { required: 'Validity start date is required' },
		isPreviousDaysAllowed	: true,
		onChange              : () => { setValue('validity_end_date', undefined); },
		placeholder											: 'Select Start Date',
	},
	{
		name                  : 'validity_end_date',
		label                 : 'Validity End Date',
		type                  : 'date',
		span                  : 6,
		rules                 : { required: 'Validity End Date is required' },
		isPreviousDaysAllowed : true,
		minDate               : addOneDay(new Date(validity_start_date)),
		placeholder											:	'Select End Date',
	},
	{
		name        : 'remarks',
		label       : 'Remarks',
		type        : 'text',
		span        : 12,
		placeholder : 'Enter Remark',
		rules       : { required: 'Remarks is required' },
	},
];
export default controls;
