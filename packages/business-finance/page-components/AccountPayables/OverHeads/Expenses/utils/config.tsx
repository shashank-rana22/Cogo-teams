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
				span  : 2,
			},
			{
				label : 'Category',
				key   : 'category',
				span  : 1.2,
			},
			{
				label : 'Created on',
				func  : 'getCreatedOn',
				span  : 2,

			},
			{
				label : renderExpensePeriod(),
				span  : 2.5,
				func  : 'renderExpensePeriod',
			},
			{
				label : 'Recurring Amount',
				key   : 'recurringAmount',
				span  : 2,
				func  : 'renderRecurringAmount',
			},
			{
				label : 'Approved By',
				func  : 'getApprovedByRecurring',
				span  : 1.5,
			},
			{
				key  : 'actionButton',
				span : 1.5,
				func : 'addExpense',
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
			span  : 1.2,
		},
		{
			label : 'Invoice Number',
			key   : 'billNumber',
			span  : 1.5,
		},
		{
			label : 'Category',
			key   : 'category',
			span  : 1.2,
		},
		{
			label : 'Invoice Amount',
			key   : 'grandTotal',
			span  : 1.5,

		},
		{
			label : 'TDS',
			key   : 'tds',
			span  : 1.5,

		},
		{
			label : 'Payable',
			span  : 1.5,
			func  : 'getPayable',
		},
		{
			label : 'Paid',
			key   : 'paidAmount',
			span  : 1,
		},
		{
			label : 'Invoice Dates',
			func  : 'getInvoiceDates',
			span  : 1.25,
		},
		{
			label : 'Approved By',
			func  : 'getApprovedBy',
			span  : 1.25,
		},
	],
});
