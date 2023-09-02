import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

const HEADER_STYLES = {
	marginBottom : '16px',
	borderRadius : '8px 8px 0px 0px',
	borderBottom : '2px solid #F68B21',
	background   : 'white',
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

export const expenseRecurringConfig = () => {
	function RenderExpensePeriod() {
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				Expense Period
				<Tooltip content="Start to End Date" placement="top">
					<div style={{ cursor: 'pointer', paddingTop: '3px' }}>
						{' '}
						<IcMInfo />
					</div>
				</Tooltip>
			</div>
		);
	}
	return {
		showHeader   : true,
		headerStyles : HEADER_STYLES,
		bodyStyles   : BODY_STYLES,
		fields       : [
			{
				label : 'Name',
				key   : 'businessName',
				span  : 2,
			},
			{
				label : 'Agreement',
				func  : 'showAgreement',
				span  : 1.2,
			},
			{
				label : 'Category',
				span  : 1.2,
				func  : 'renderCategory',
			},
			{
				label   : 'Created on',
				func    : 'getCreatedOn',
				span    : 1.2,
				sorting : { name: 'createdDateSortBy' },
			},
			{
				label : RenderExpensePeriod(),
				span  : 1.4,
				func  : 'renderExpensePeriod',
			},
			{
				label   : 'Recurring Amount',
				key     : 'recurringAmount',
				span    : 1.8,
				func    : 'renderRecurringAmount',
				sorting : { name: 'amountSortBy' },
			},
			{
				label : 'Ledger Amount',
				key   : 'recurringAmount',
				span  : 1.8,
				func  : 'renderLedgerAmount',
			},
			{
				label : 'Approved By',
				func  : 'getApprovedByRecurring',
				span  : 1.2,
			},
			{
				key  : 'actionButton',
				span : 1.4,
				func : 'addExpense',
			},
			{
				label : '',
				func  : 'renderView',
				span  : 1,
			},
		],
	};
};

export const expenseNonRecurringConfig = () => ({
	showHeader   : true,
	headerStyles : HEADER_STYLES,
	bodyStyles   : BODY_STYLES,
	fields       : [
		{
			label : 'Name',
			key   : 'sellerDetails.organizationName',
			span  : 1.4,
		},
		{
			label : 'Invoice Number',
			func  : 'getInvoiceNumber',
			span  : 1.4,
		},
		{
			label : 'Category',
			span  : 1.2,
			func  : 'renderCategory',
		},
		{
			label   : 'Invoice Amount',
			func    : 'renderInvoiceAmount',
			span    : 1.6,
			sorting : { name: 'invoiceAmountSortType' },
		},
		{
			label   : 'TDS',
			func    : 'renderTds',
			span    : 0.8,
			sorting : { name: 'tdsSortType' },
		},
		{
			label   : 'Payable',
			span    : 1.2,
			func    : 'getPayable',
			sorting : { name: 'payableSortType' },
		},
		{
			label   : 'PaidAmount',
			func    : 'renderPaid',
			span    : 1.2,
			sorting : { name: 'paidAmountSortType' },
		},
		{
			label : 'Ledger Amount',
			key   : 'recurringAmount',
			span  : 1.2,
			func  : 'renderLedgerAmount',
		},
		{
			label : 'Invoice Dates',
			func  : 'getInvoiceDates',
			span  : 1.4,
		},
		{
			label : 'Approved By',
			func  : 'getApprovedByRecurring',
			span  : 1.2,
		},
		{
			label : '',
			func  : 'renderView',
			span  : 1,
		},
	],
});
