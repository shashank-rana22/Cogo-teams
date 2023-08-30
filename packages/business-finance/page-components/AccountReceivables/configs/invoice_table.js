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
				{row?.call_duration}
			</div>

		),
	},
	{
		Header   : 'Invoice Amt',
		id       : 'grand_total',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.grand_total}
			</div>

		),
	},
	{
		Header   : 'Invoicing Date',
		id       : 'invoice_date',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.invoice_date}
			</div>

		),
	},
	{
		Header   : 'Due Date',
		id       : 'due_date',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.due_date}
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
		id       : 'stakeholder_id',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.stakeholder_id}
			</div>

		),
	},

]);

export default invoiceTable;
