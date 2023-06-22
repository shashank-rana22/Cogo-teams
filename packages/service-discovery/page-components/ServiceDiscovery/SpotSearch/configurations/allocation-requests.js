import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const allocationRequests = {
	heading   : 'Allocation Requests',
	api       : 'requests',
	apiScope  : 'allocation',
	authkey   : 'get_allocation_requests',
	placement : 'center',
	type      : 'allocation_requests',
	fields    : [
		{
			key   : 'service.serial_id',
			label : 'Serial Id',
			span  : 1,
		},
		{
			key   : '',
			label : 'Organization',
			func  : 'renderBusinessName',
			span  : 1.5,
		},
		{
			key   : 'service_user.name',
			label : 'User',
			span  : 1.5,
		},
		{
			key   : '',
			label : 'Stakeholder Type',
			func  : 'renderStakeholderType',
			span  : 1,
		},
		{
			key   : 'user.name',
			label : 'Requested Agent',
			span  : 1,
		},
		{
			key   : 'created_by.name',
			label : 'Requested By',
			span  : 1.5,
		},
		{
			key    : 'created_at',
			label  : 'Requested At',
			render : (item) => {
				const formattedDate = formatDate({
					date       : item.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'dateTime',
					separator  : ' | ',
				});
				return <div>{item.created_at ? formattedDate : '___'}</div>;
			},
			span: 1,
		},
		{
			key   : 'reason',
			label : 'Reason',
			span  : 1.5,
		},
		{
			key   : '',
			label : 'Status',
			func  : 'renderRequestStatus',
			span  : 1,
		},
		{
			key   : 'booking_confirmation_proof',
			label : 'Booking Confirmation Proof',
			func  : 'renderProofUrl',
			span  : 1,
		},
	],
	filterProps: {
		controls: [
			{
				name           : 'service_id',
				label          : 'Select Organization',
				type           : 'select',
				placeholder    : 'Select Organization',
				optionsListKey : 'organizations',
				params         : {
					filters: {
						status: 'active',
					},
				},
				multiple: true,
			},
			{
				name           : 'partner_service_id',
				label          : 'Select Partner',
				type           : 'select',
				placeholder    : 'Select Partner',
				optionsListKey : 'partners',
				params         : {
					filters: {
						status: 'active',
					},
				},
				multiple: true,
			},
			{
				name        : 'status',
				label       : 'Select Status',
				type        : 'select',
				placeholder : 'Select Status',
				options     : [
					{
						label : 'Pending',
						value : 'pending',
					},
					{
						label : 'Approved',
						value : 'approved',
					},
					{
						label : 'Rejected',
						value : 'rejected',
					},
					{
						label : 'Active',
						value : 'active',
					},
					{
						label : 'Inactive',
						value : 'inactive',
					},
				],
			},
		],
	},
};

export default allocationRequests;
