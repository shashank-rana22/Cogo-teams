import getGeoConstants from '@cogoport/globalization/constants/geo';

const getControls = ({
	title = '',
	mobileNumber = '',
	mobileCountryCode = '',
	agentType = '',
}) => {
	const geo = getGeoConstants();

	const FEEDBACK_OPTIONS = [
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
			label : 'Payment recovery',
			value : 'payment_recovery',
		},
		{
			label : 'Other',
			value : 'other',
		},

	];

	if (agentType === 'shipment_specialist') {
		FEEDBACK_OPTIONS.unshift({
			label : 'Shipment Enquiry',
			value : 'shipment_enquiry',
		});
	}

	return {
		feedbackType: {
			name     : 'title',
			type     : 'chips',
			label    : 'Reason for contact ?',
			rules    : { required: 'Required' },
			value    : '',
			options  : FEEDBACK_OPTIONS,
			multiple : false,
		},
		sid: {
			name        : 'sid',
			type        : 'select',
			rules       : title === 'shipment_enquiry' ? { required: 'Required' } : undefined,
			asyncKey    : 'list_user_shipments',
			placeholder : 'Select SID',
			isClearable : true,
			params      : {
				mobile_country_code     : mobileCountryCode || geo.country.mobile_country_code,
				mobile_number           : mobileNumber,
				user_shipments_required : false,
			},
		},
		feedbackDesc: {
			name        : 'communication_summary',
			type        : 'textarea',
			rows        : 5,
			placeholder : 'Enter Remark',
			rules       : { required: 'Required' },
		},
	};
};

export default getControls;
