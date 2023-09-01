import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

const invoiceTable = () => ([
	{
		Header   : 'Invoice Number',
		id       : 'invoice_number',
		accessor : (row) => (

			<div style={{ fontWeight: 600 }}>
				{row?.invoice_number}
			</div>

		),

	},
	{
		Header   : 'Shipment Id',
		id       : 'shipment_serial_id',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.shipment_serial_id}
			</div>

		),
	},
	{
		Header   : 'Open Invoice Amt',
		id       : 'balance',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{formatAmount({
					amount   : row?.balance,
					currency : row?.invoice_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>

		),
	},
	{
		Header   : 'Invoice Amt',
		id       : 'grand_total',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{formatAmount({
					amount   : row?.grand_total,
					currency : row?.invoice_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>

		),
	},
	{
		Header   : 'Invoicing Date',
		id       : 'invoice_date',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{formatDate({
					date       : row?.invoice_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
					formatType : 'date',
				})}
			</div>

		),
	},
	{
		Header   : 'Due Date',
		id       : 'due_date',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{formatDate({
					date       : row?.due_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
					formatType : 'date',
				})}
			</div>

		),
	},
	{
		Header   : 'Due Days',
		id       : 'due_days',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.due_days}
			</div>

		),
	},
	{
		Header   : 'Booking Note',
		id       : 'document_details',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.document_details}
			</div>

		),
	},
	{
		Header   : 'Stakeholder Name',
		id       : 'stakeholder_name',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.stakeholder_name}
			</div>

		),
	},

]);

export default invoiceTable;
