const headerStyle = {
	marginBottom : '16px',
	paddingLeft  : '10px',
	borderRadius : '8px 8px 0px 0px',
	borderBottom : '2px solid #F68B21',
	background   : 'none',
	color        : 'black',
	marginTop    : '20px',
	fontSize     : '14px',
	fontStyle    : 'normal',
	fontFamily   : 'Poppins',
};

const bodyStyles = {
	color      : ' #333333',
	fontWeight : '400',
	fontSize   : '14px',
	lineHeight : '14px',
	fontFamily : 'Poppins',
	fontStyle  : 'normal',
};

const VENDOR_CONFIG = {
	showHeader   : true,
	headerStyles : headerStyle,
	bodyStyles,
	fields       : [
		{
			label : 'Vendor ID',
			key   : 'vendorSerialId',
			span  : 1,
		},
		{
			label : 'Kyc Status',
			span  : 1,
			func  : 'renderKYCStatus',
		},
		{
			label : 'Name',
			span  : 1,
			func  : 'renderName',
		},
		{
			label : 'PAN',
			key   : 'pan',
			span  : 1,

		},
		{
			label : 'Category',
			span  : 1,
			func  : 'renderCategory',
		},
		{
			label   : 'Payments',
			span    : 1,
			func    : 'renderPayments',
			sorting : { name: 'paymentSortType' },
		},
		{
			label   : 'Open Invoices',
			key     : 'openInvoices',
			span    : 1,
			sorting : { name: 'openInvoiceSortType' },
			func    : 'renderInvoice',
		},
		{
			label   : 'Created At',
			span    : 1,
			func    : 'rendeDate',
			sorting : { name: 'createdAtSortType' },
		},
		// {
		// 	label : '',
		// 	key   : 'viewMoreButton',
		// 	span  : 1,
		// 	func  : 'renderViewMoreButton',
		// },
	],
};

export default VENDOR_CONFIG;
