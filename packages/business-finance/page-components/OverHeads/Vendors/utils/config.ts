import getGeoConstants from '@cogoport/globalization/constants/geo';

const HEADER_STYLE = {
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

const BODY_STYLES = {
	color      : ' #333333',
	fontWeight : '400',
	fontSize   : '14px',
	lineHeight : '14px',
	fontFamily : 'Poppins',
	fontStyle  : 'normal',
};

const configs = () => {
	const geo = getGeoConstants();

	const VENDOR_CONFIG = {
		showHeader   : true,
		headerStyles : HEADER_STYLE,
		bodyStyles   : BODY_STYLES,
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
				label : geo.others.identification_number.label,
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
		],
	};

	const EXPENSE_CONFIG = {
		showHeader   : true,
		headerStyles : HEADER_STYLE,
		bodyStyles   : BODY_STYLES,
		fields       : [
			{
				label : 'Name',
				key   : 'sellerDetails.organizationName',
				span  : 1.5,
			},
			{
				label : 'Invoice Number',
				func  : 'getInvoiceNumber',
				span  : 1.5,
			},
			{
				label : 'Category',
				span  : 1.3,
				func  : 'renderCategory',
			},
			{
				label : 'Invoice Amount',
				func  : 'renderInvoiceAmount',
				span  : 1.5,
			},
			{
				label : 'TDS',
				func  : 'renderTds',
				span  : 0.8,
			},
			{
				label : 'Payable',
				span  : 1.2,
				func  : 'getPayable',
			},
			{
				label : 'Paid',
				func  : 'renderPaid',
				span  : 1.2,
			},
			{
				label : 'Invoice Dates',
				func  : 'getInvoiceDates',
				span  : 1.7,
			},
			{
				label : 'Approved By',
				func  : 'getApprovedByRecurring',
				span  : 1.25,
			},
			{
				label : '',
				span  : 1,
				func  : 'renderView',
			},
		],
	};
	return {
		VENDOR_CONFIG,
		EXPENSE_CONFIG,
	};
};

export default configs;
