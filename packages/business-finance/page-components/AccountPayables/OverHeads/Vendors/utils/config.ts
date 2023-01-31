const headerStyle = {
	marginBottom : '16px',
	paddingLeft  : '10px',
	borderRadius : '8px',
	background   : '#333',
	marginTop    : '20px',
	fontSize     : '14px',
	fontStyle    : 'normal',
	fontFamily   : 'Poppins',
};

const bodyStyles = {
	border     : '1px solid #C7C7C7',
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
			span  : 1.2,
		},
		{
			label : 'Kyc Status',
			key   : 'kycStatus',
			span  : 0.7,
			func  : 'renderKYCStatus',
		},
		{
			label : 'Name',
			key   : 'name',
			span  : 1.2,
		},
		{
			label : 'PAN',
			key   : 'pan',
			span  : 1,

		},
		{
			label : 'Category',
			key   : 'category',
			span  : 1,

		},
		{
			label   : 'Payments',
			key     : 'payments',
			span    : 1,
			sorting : { name: 'payments' },
			func    : 'renderPayments',

		},
		{
			label   : 'Open Invoices',
			key     : 'openInvoices',
			span    : 1.5,
			sorting : { name: 'invoicesCount' },
			func    : 'renderInvoice',
		},
		{
			label   : 'Created At',
			key     : 'createdDate',
			span    : 1.25,
			func    : 'rendeFormate',
			sorting : { name: 'modifiedDateSortType' },
		},
		{
			label : '',
			key   : 'viewMoreButton',
			span  : 1.25,
			func  : 'renderViewMoreButton',
		},
	],
};

export default VENDOR_CONFIG;
