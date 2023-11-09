const controls = ({
	formatRaiseToDeskOptions = [],
	watchRaisedToDesk = '',
	setAdditionalInfo = () => {},
	STAKEHOLDER_OPTIONS = [],
}) => ([
	{
		label       : 'Raised To Desk',
		placeholder : 'Select Raised To Desk',
		name        : 'raised_to_desk',
		type        : 'select',
		rules       : { required: true },
		options     : formatRaiseToDeskOptions,
	},
	{
		label       : 'Raised To',
		placeholder : 'Select Raised To',
		name        : 'raised_to',
		type        : 'select',
		options     : STAKEHOLDER_OPTIONS,
	},
	{
		label       : 'Select issue type',
		placeholder : 'Select issue type',
		name        : 'issue_type',
		type        : 'async-select',
		initialCall : true,
		rules       : { required: true },
		asyncKey    : 'default_types',
		params      : {
			RequestType  : 'shipment' || undefined,
			RaisedByDesk : 'Auditor' || undefined,
			RaisedToDesk : watchRaisedToDesk || undefined,
		},
		onChange: (_, val) => setAdditionalInfo(val?.AdditionalInfo),
	},
	{
		label       : 'Describe Issue',
		placeholder : 'Enter Comments',
		name        : 'describe_issue',
		type        : 'textarea',
		rules       : { required: true },
	},
	{
		name       : 'supporting_document',
		span       : 12,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		label      : 'Upload Supporting Document(Optional)',
		uploadType : 'aws',
	},
]);

export default controls;
