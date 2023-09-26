const controls = ({
	setRaiseToDesk = () => {},
	formatRaiseToDeskOptions = [],
	formValues = {},
	setAdditionalInfo = () => {},
}) => {
	const { service, trade_type, request_type, raise_by_desk, raise_to_desk } = formValues;
	return ([
		{
			label       : 'Raised By Desk',
			placeholder : 'Select Trade Type',
			type        : 'async-select',
			asyncKey    : 'configuration_categories',
			name        : 'raised_by_desk',
			rules       : { required: true },
			params      : {
				Service          : service || undefined,
				TradeType        : trade_type || undefined,
				RequestType      : request_type || undefined,
				CategoryDeskType : 'by_desk',
			},
			valueKey : 'raised_by_desk',
			labelKey : 'raised_by_desk',
			onChange : (_, val) => {
				setRaiseToDesk(val?.raised_to_desk);
				// resetField('sub_category');
			},
		},
		{
			label       : 'Raised To Desk',
			placeholder : 'Select Trade Type',
			name        : 'raised_to_desk',
			type        : 'select',
			rules       : { required: true },
			options     : formatRaiseToDeskOptions,
		},
		{
			label       : 'Select issue type',
			placeholder : 'Select Trade Type',
			name        : 'issue_type',
			type        : 'async-select',
			rules       : { required: true },
			asyncKey    : 'default_types',
			params      : {
				Audience     : 'cogoport_user',
				RequestType  : request_type || undefined,
				Service      : service || undefined,
				TradeType    : trade_type || undefined,
				RaisedByDesk : raise_by_desk || undefined,
				RaisedToDesk : raise_to_desk || undefined,
			},
			onChange: (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label       : 'Describe Issue',
			placeholder : 'Enter Comments',
			name        : 'describe_issue',
			type        : 'textarea',
			rules       : { required: true },
			options     : [
				{ label: 'Shipment', value: 'shipment' },
				{ label: 'Rate', value: 'rate' },
				{ label: 'Finance', value: 'finance' },
				{ label: 'Platform Issue', value: 'platform_issue' },
			],
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
};

export default controls;
