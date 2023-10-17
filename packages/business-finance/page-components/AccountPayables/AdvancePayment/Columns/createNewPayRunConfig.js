export const CREATE_NEW_PAYRUN_CONFIG = {
	showHeader         : true,
	showHeaderCheckbox : true,
	pageLimit          : 20,
	headerStyles       : {
		borderRadius : '8px',
		background   : 'none',
		color        : '#333',
	},
	bodyStyles: {
		color      : '#333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			func : 'renderCheckbox',
			span : 0.2,
		},
		{
			label : 'Adv. Doc. No.',
			key   : 'advanceDocumentNo',
			span  : 1.2,
			func  : 'renderDocNumber',
		},
		{
			label : 'Incident Number',
			key   : 'incidentRefNo',
			func  : 'renderIncidentNumber',
			span  : 1.2,
		},
		{
			label  : 'SID',
			key    : 'jobNumber',
			topKey : {
				key         : 'jobNumber',
				type        : 'href',
				redirectKey : 'shipmentId',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderSIDnumber',
			span : 1.2,
		},
		{
			key   : 'organizationName',
			label : 'Organisation',
			func  : 'renderOrganization',
			span  : 1.8,
		},
		{
			label   : 'Advance Amount',
			key     : 'payableAmount',
			func    : 'renderAmountWithCurrency',
			sorting : { name: 'amountSortType' },
			span    : 1.6,
		},
		{
			key   : 'bankName',
			label : 'Bank Account Details',
			func  : 'renderBankData',
			span  : 2,
		},
		{
			key     : 'requestedBy',
			label   : 'Requested by & on',
			sorting : { name: 'requestedAtSortType' },
			span    : 1.8,
			func    : 'renderRequestedBy',
		},
		{
			label   : 'Approved by & on',
			key     : 'approvedBy',
			sorting : { name: 'approvedAtSortType' },
			span    : 1.8,
			func    : 'renderApprovedBy',
		},
	],
};