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
			key   : 'referenceId',
			span  : 1.2,
		},
		{
			label : 'Kyc Status',
			span  : 0.7,
			func  : 'renderKYCStatus',
		},
		{
			label : 'Name',
			key   : 'organizationName',
			span  : 1.2,
		},
		{
			label : 'PAN',
			key   : 'pan',
			span  : 1,

		},
		{
			label : 'Category',
			key   : 'catagory',
			span  : 1,

		},
		{
			label   : 'Payments',
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
			key     : 'createdAt',
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
