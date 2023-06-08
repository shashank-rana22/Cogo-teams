const headerStyle = {
	borderRadius : '8px 8px 0px 0px',
	borderBottom : '2px solid var(--color-accent-orange-2)',
	background   : 'white',
	color        : 'black',
	marginTop    : '20px',
	fontSize     : '14px',
	fontStyle    : 'normal',
	fontFamily   : 'Poppins',
	padding      : '32px 0px',
};

const bodyStyles = {
	color      : ' #333333',
	fontWeight : '400',
	fontSize   : '12px',
	lineHeight : '14px',
	fontFamily : 'Poppins',
	fontStyle  : 'normal',
};

export const invoiceListConfig = () => ({
	showHeader   : true,
	headerStyles : headerStyle,
	bodyStyles,
	fields       : [
		{
			label : 'Name',
			key   : 'organizationName',
			span  : 1,
			func  : 'showOrgName',
		},
		{
			label : 'Invoice Number',
			func  : 'showInvoiceNumber',
			span  : 1,
		},
		{
			label : 'SID',
			span  : 1,
			func  : 'showSid',
		},
		{
			label : 'Entity Type',
			key   : 'entityCode',
			span  : 0.5,
		},
		{
			label   : 'Invoice Amount',
			span    : 1,
			func    : 'showInvoiceAmount',
			sorting : { name: 'grandTotal' },
		},
		{
			label : 'Ledger Amount',
			span  : 1,
			func  : 'showLedgerAmount',
		},
		{
			label : 'Balance Amount',
			func  : 'showBalanceAmount',
			span  : 1,
		},
		{
			label   : 'Invoice Date',
			func    : 'showInvoiceDate',
			span    : 1,
			sorting : { name: 'invoiceDate' },
		},
		{
			label   : 'Due Date',
			func    : 'showDueDate',
			sorting : { name: 'dueDate' },
			span    : 1,
		},
		{
			label : 'Overdue Days',
			key   : 'overDueDays',
			span  : 1,
		},
		{
			label : 'Proforma Status',
			func  : 'showProformaStatus',
			span  : 1,
		},
		{
			label : 'Actions',
			func  : 'showActions',
			span  : 1,
		},
	],
});
