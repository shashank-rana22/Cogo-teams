const ccCallListTable = () => ([
	{
		Header   : 'Name',
		id       : 'name',
		accessor : (row) => (

			<div style={{ fontWeight: 600 }}>
				{row?.name}
			</div>

		),

	},
	{
		Header   : 'Total Calls',
		id       : 'success_calls',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.success_calls}
			</div>

		),
	},
	{
		Header   : 'Call Duration',
		id       : 'call_duration',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.call_duration}
			</div>

		),
	},
	{
		Header   : 'Total Meetings',
		id       : 'successful_meetings',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.successful_meetings}
			</div>

		),
	},
	{
		Header   : 'Meeting Duration',
		id       : 'meeting_duration',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.call_duration}
			</div>

		),
	},
	{
		Header   : 'Average Minute/call',
		id       : 'average_minutes_per_call',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.call_duration}
			</div>

		),
	},
	{
		Header   : 'Average Calls/day',
		id       : 'average_calls_per_day',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.call_duration}
			</div>

		),
	},
	{
		Header   : 'Unique Customer Contacted',
		id       : 'unique_customer_contacted',
		accessor : (row) => (
			<div style={{ fontWeight: 600 }}>
				{row?.call_duration}
			</div>

		),
	},

]);

export default ccCallListTable;
