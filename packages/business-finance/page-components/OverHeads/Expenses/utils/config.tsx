import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

const headerStyle = {
	marginBottom : '16px',
	paddingLeft  : '10px',
	borderRadius : '8px 8px 0px 0px',
	borderBottom : '2px solid #F68B21',
	background   : 'white',
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

export const expenseRecurringConfig = () => {
	const renderExpensePeriod = () => (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			Expense Period &nbsp;
			<Tooltip content="Start to End Date" placement="top">
				<div style={{ cursor: 'pointer', paddingTop: '3px' }}>
					{' '}
					<IcMInfo />
				</div>
			</Tooltip>
		</div>
	);
	return {
		showHeader   : true,
		headerStyles : headerStyle,
		bodyStyles,
		fields       : [
			{
				label : 'Name',
				key   : 'businessName',
				span  : 2,
			},
			{
				label : 'Agreement',
				func  : 'showAgreement',
				span  : 1.5,
			},
			{
				label  : 'Category',
				span   : 1.8,
				func   : 'renderCategory',
				styles : { display: 'flex', justifyContent: 'center' },
			},
			{
				label   : 'Created on',
				func    : 'getCreatedOn',
				span    : 2,
				sorting : { name: 'createdDateSortBy' },
			},
			{
				label  : renderExpensePeriod(),
				span   : 2,
				func   : 'renderExpensePeriod',
				styles : { display: 'flex', justifyContent: 'center' },
			},
			{
				label   : 'Recurring Amount',
				key     : 'recurringAmount',
				span    : 2,
				func    : 'renderRecurringAmount',
				sorting : { name: 'amountSortBy' },
				styles  : { display: 'flex', justifyContent: 'center' },
			},
			{
				label  : 'Approved By',
				func   : 'getApprovedByRecurring',
				span   : 1.5,
				styles : { display: 'flex', justifyContent: 'center' },
			},
			{
				key    : 'actionButton',
				span   : 1.5,
				func   : 'addExpense',
				styles : { display: 'flex', justifyContent: 'center' },
			},
		],
	};
};

export const expenseNonRecurringConfig = () => ({
	showHeader   : true,
	headerStyles : headerStyle,
	bodyStyles,
	fields       : [
		{
			label : 'Name',
			key   : 'sellerDetails.organizationName',
			span  : 1.8,
		},
		{
			label  : 'Invoice Number',
			func   : 'getInvoiceNumber',
			span   : 1.5,
			styles : { display: 'flex', justifyContent: 'center' },
		},
		{
			label : 'Category',
			span  : 1.3,
			func  : 'renderCategory',
		},
		{
			label   : 'Invoice Amount',
			func    : 'renderInvoiceAmount',
			span    : 1.5,
			sorting : { name: 'invoiceAmountSortType' },
			styles  : { display: 'flex', justifyContent: 'center' },
		},
		{
			label   : 'TDS',
			func    : 'renderTds',
			span    : 1.2,
			sorting : { name: 'tdsSortType' },
			styles  : { display: 'flex', justifyContent: 'center' },
		},
		{
			label   : 'Payable',
			span    : 1.5,
			func    : 'getPayable',
			sorting : { name: 'payableSortType' },
			styles  : { display: 'flex', justifyContent: 'center' },
		},
		{
			label   : 'Paid',
			func    : 'renderPaid',
			span    : 0.8,
			sorting : { name: 'paidAmountSortType' },
			styles  : { display: 'flex', justifyContent: 'center' },
		},
		{
			label  : 'Invoice Dates',
			func   : 'getInvoiceDates',
			span   : 1.4,
			styles : { display: 'flex', justifyContent: 'center' },
		},
		{
			label  : 'Approved By',
			func   : 'getApprovedByRecurring',
			span   : 1.25,
			styles : { display: 'flex', justifyContent: 'center' },
		},
	],
});
