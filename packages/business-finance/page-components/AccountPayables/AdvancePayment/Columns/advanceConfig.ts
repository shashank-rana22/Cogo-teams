export const ADVANCE_CONFIG = {
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
			span  : 0.9,
		},
		{
			label : 'Incident Number',
			key   : 'incidentRefNo',
			func  : 'renderIncidentNumber',
			span  : 0.9,
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
			span : 0.9,
		},
		{
			label : 'Entity',
			key   : 'entityCode',
			func  : 'renderEntityCode',
			span  : 0.5,

		},
		{
			key   : 'organizationName',
			label : 'Organisation',
			func  : 'renderOrganization',
			span  : 1.4,
		},
		{
			label   : 'Advance Amount',
			key     : 'payableAmount',
			func    : 'renderAmountWithCurrency',
			sorting : { name: 'amountSortType' },
			span    : 1.5,
		},
		{
			key     : 'requestedBy',
			label   : 'Requested by & on',
			sorting : { name: 'requestedAtSortType' },
			span    : 1.5,
			func    : 'renderRequestedBy',
		},
		{
			label   : 'Approved by & on',
			key     : 'approvedBy',
			sorting : { name: 'approvedAtSortType' },
			span    : 1.5,
			func    : 'renderApprovedBy',
		},
	],
};
