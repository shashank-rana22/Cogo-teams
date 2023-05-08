export const VIEW_SELECTED_CONFIG = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			label : 'Adv. Doc. No.',
			key   : 'advanceDocumentNo',
			span  : 1.2,
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
			span : 1,
		},
		{
			key   : 'organizationName',
			label : 'Organisation',
			func  : 'renderModifiedName',
			span  : 1.8,
		},
		{
			label : 'Advance Amount',
			key   : 'payableAmount',
			func  : 'renderAmountWithCurrency',
			span  : 1.2,
		},
		{
			key   : 'bankName',
			label : 'Bank Account Details',
			func  : 'renderBankDetails',
			span  : 1.8,
		},

		{
			key   : 'requestedBy',
			label : 'Requested by & on',
			span  : 1.8,
			func  : 'renderRequestedBy',
		},
		{
			label : 'Approved by & on',
			key   : 'approvedBy',
			span  : 1.8,
			func  : 'renderApprovedBy',
		},
		{
			key  : 'delete',
			span : 0.2,
			func : 'renderIcDelete',
		},

	],
};
