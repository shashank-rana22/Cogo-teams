const getControls = ({
	orgId = '', title = '',
	userId = '',
	mobileNumber = '',
}) => ({
	feedbackType: {
		name    : 'title',
		type    : 'chips',
		label   : 'Reason for contact ?',
		rules   : { required: 'Required' },
		value   : '',
		options : [
			{
				label : 'Introductory',
				value : 'introductory',
			},
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Rate enquiry',
				value : 'rate_enquiry',
			},
			{
				label : 'Shipment Enquiry',
				value : 'shipment_enquiry',
			},
			{
				label : 'Payment recovery',
				value : 'payment_recovery',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		multiple: false,
	},
	sid: {
		name        : 'sid',
		type        : 'select',
		rules       : title === 'shipment_enquiry' ? { required: 'Required' } : undefined,
		asyncKey    : 'list_user_shipments',
		placeholder : 'Select SID',
		params      : {
			filters: {
				importer_exporter_id : orgId || undefined,
				user_id              : (!orgId && userId) ? userId : undefined,
				mobileNumber         : (!orgId && !userId && mobileNumber) ? mobileNumber : undefined,
			},
		},
	},
	feedbackDesc: {
		name        : 'communication_summary',
		type        : 'textarea',
		rows        : 5,
		placeholder : 'Enter Remark',
		rules       : { required: 'Required' },
	},
});

export default getControls;
