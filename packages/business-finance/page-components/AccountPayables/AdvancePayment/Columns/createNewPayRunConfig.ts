export const CREATE_NEW_PAYRUN_CONFIG = {
	showHeader         : true,
	showHeaderCheckbox : true,
	pageLimit          : 20,
	headerStyles       : {
		// marginBottom : '16px',
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		// borderBottom : '1.5px solid #F68B21',
		// marginTop    : '20px',
		// paddingLeft  : '14px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			func : 'renderCheckbox',
			span : 0.4,
		},
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
			key   : 'businessName',
			label : 'Organisation',
			// func      : 'renderName',
			// className : 'vendor_text',
			span  : 1.4,
			// style     : {
			// 	position   : 'sticky',
			// 	left       : '52px',
			// 	background : 'white',
			// 	transform  : 'translateX(-2px)',
			// 	zIndex     : 1,
			// },
		},
		{
			label : 'Advance Amount',
			key   : 'advancedAmount',
			func  : 'renderAmountWithCurrency',
			span  : 1,
		},
		{
			key   : 'bankName',
			label : 'Bank Account Details',
			func  : 'renderBankDetails',
			span  : 2.5,
		},

		{
			label : 'Document',
			func  : 'renderDocument',
			span  : 1,
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceDetails',
			span : 0.2,
		},
	],
};
