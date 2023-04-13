export const ADVANCE_CONFIG = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		// marginBottom : '16px',
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		// borderBottom : '1.5px solid #F68B21',
		// marginTop    : '20px',
		// paddingLeft  : '14px',
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
			label : 'Incident Number',
			key   : 'incidentNumber',
			func  : 'renderIncidentNumber',
			// topKey : {
			// 	key     : 'incidentNumber',
			// 	type    : 'pdfView',
			// 	linkKey : 'documentUrl',
			// },
			// lowerKey: {
			// 	key       : 'invoiceType',
			// 	type      : 'tag',
			// 	className : 'warning-tag',
			// },
			// func  : 'renderFieldPair',
			// style : {
			// 	position   : 'sticky',
			// 	left       : '285px',
			// 	background : 'white',
			// 	transform  : 'translateX(-2px)',
			// 	zIndex     : 1,
			// },
			span  : 0.8,
		},
		{
			label : 'SID',
			key   : 'sidNumber',
			// topKey : {
			// 	key         : 'jobNumber',
			// 	type        : 'href',
			// 	redirectKey : 'shipmentId',
			// },
			// lowerKey: {
			// 	key  : 'serviceType',
			// 	type : 'serviceType',
			// },
			func  : 'renderSIDnumber',
			span  : 0.7,
		},
		{
			label : 'Entity',
			key   : 'entity',
			span  : 0.5,

		},
		{
			key   : 'businessName',
			label : 'Organisation',
			func  : 'renderOrganization',
			span  : 1.4,
		},
		{
			label   : 'Advance Amount',
			key     : 'advancedAmount',
			func    : 'renderAmountWithCurrency',
			sorting : { name: 'amountSortType' },
			span    : 1.5,
		},
		{
			key     : 'reuestedByName',
			label   : 'Requested by & on',
			sorting : { name: 'requestedDateSortType' },
			span    : 1.5,
			func    : 'renderRequestedBy',
		},
		{
			label   : 'Approved by & on',
			key     : 'approvedByName',
			sorting : { name: 'approvedDateSortType' },
			span    : 1.5,
			func    : 'renderApprovedBy',
		},
		{
			label : 'Document',
			func  : 'renderDocument',
			span  : 0.8,
		},
	],
};
