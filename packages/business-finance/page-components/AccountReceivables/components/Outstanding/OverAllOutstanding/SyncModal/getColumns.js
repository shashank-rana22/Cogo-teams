const dateToIst = (date) => {
	const ISTDATE = new Date(date)
		.toLocaleString(undefined, { timeZone: 'IST' });
	if (ISTDATE === 'Invalid Date') { return false; }
	return ISTDATE;
};
const getColumns = () => {
	const columns = [
		{
			Header   : 'Snapshot Organization Outstandings',
			accessor : (row) => dateToIst(row?.snapshot_organization_outstandings?.last_synced_at) || '-',
		},
		{
			Header   : 'Temp Outstanding Invoices',
			accessor : (row) => dateToIst(row?.temp_outstanding_invoices?.last_synced_at) || '-',
		},
		{
			Header   : 'Sage Payment Details',
			accessor : (row) => dateToIst(row?.sage_payment_details?.last_synced_at) || '-',
		},
		{
			Header   : 'Temp Knock Off Invoices',
			accessor : (row) => dateToIst(row?.temp_knock_off_invoices?.last_synced_at) || '-',
		},
	];
	return columns;
};

export default getColumns;
