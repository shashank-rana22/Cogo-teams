const DEFAULT_VALUE = 0;
const DEFAULT_MINUTES_VALUE = 60;
const DEFAULT_SECONDS_VALUE = 60;
const DEFAULT_HOURS = 24;

const ccCallListTable = () => {
	const handleCalls = (key, subKey) => `${key}/${subKey}`;
	const handleDurationSeconds = (item) => {
		const minutes = Number(item) || DEFAULT_VALUE;
		const seconds = Math.round((minutes - Math.floor(minutes)) * DEFAULT_SECONDS_VALUE);
		const minutesRounded = Math.floor(minutes);
		const hours = minutes && Math.floor(minutes / DEFAULT_MINUTES_VALUE);
		const totalDays = hours && Math.floor(hours / DEFAULT_HOURS);
		if (totalDays) {
			return (
				minutes
				&& `${totalDays}d ${hours % DEFAULT_HOURS}h ${minutesRounded % DEFAULT_MINUTES_VALUE}m  ${seconds}s`
			);
		}
		if (hours) {
			return minutes && `${hours}h ${minutesRounded % DEFAULT_MINUTES_VALUE}m  ${seconds}s`;
		}
		if (minutesRounded) {
			return minutes && `${minutesRounded % DEFAULT_MINUTES_VALUE}m  ${seconds}s`;
		}
		return minutes && `${seconds}s`;
	};

	return ([
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
					{handleCalls(row?.success_calls, row?.total_calls)}
				</div>

			),
		},
		{
			Header   : 'Call Duration',
			id       : 'call_duration',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{handleDurationSeconds(row?.call_duration)}
				</div>

			),
		},
		{
			Header   : 'Total Meetings',
			id       : 'successful_meetings',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{handleCalls(row?.successful_meetings, row?.total_meetings)}
				</div>

			),
		},
		{
			Header   : 'Meeting Duration',
			id       : 'meeting_duration',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{handleDurationSeconds(row?.meeting_duration)}
				</div>

			),
		},
		{
			Header   : 'Average Minute/call',
			id       : 'average_minutes_per_call',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{handleDurationSeconds(row?.average_minutes_per_call)}
				</div>

			),
		},
		{
			Header   : 'Average Calls/day',
			id       : 'average_calls_per_day',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{row?.average_calls_per_day}
				</div>

			),
		},
		{
			Header   : 'Unique Customer Contacted',
			id       : 'unique_customer_contacted',
			accessor : (row) => (
				<div style={{ fontWeight: 600 }}>
					{row?.unique_customer_contacted}
				</div>

			),
		},

	]);
};

export default ccCallListTable;
