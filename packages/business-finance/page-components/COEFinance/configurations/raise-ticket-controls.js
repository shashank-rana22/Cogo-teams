const controls = ({
	formatRaiseToDeskOptions = [],
	watchRaisedToDesk = '',
	setAdditionalInfo = () => {},
	shipmentData = {},
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
		label       : 'Select issue type',
		placeholder : 'Select issue type',
		name        : 'issue_type',
		type        : 'async-select',
		rules       : { required: true },
		asyncKey    : 'default_types',
		params      : {
			// Audience     : 'cogoport_user',
			RequestType  : 'shipment' || undefined,
			Service      : shipmentData?.shipment_type || undefined,
			TradeType    : shipmentData?.trade_type || undefined,
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
		label      : 'Upload Supporting Document',
		uploadType : 'aws',
	},
]);

export default controls;
