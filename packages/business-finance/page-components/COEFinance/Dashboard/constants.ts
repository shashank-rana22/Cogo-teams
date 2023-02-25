export const OPTIONS = [
	{
		label : 'Open Jobs',
		value : 'per_package',
	},
	{
		label : 'Closed Jobs',
		value : 'total_gross',
	},
];
export const columns = [
	{
		Header   : 'Name',
		accessor : 'Name',
		id       : 'Name',
		// Cell     : ({ row: { original } }) => {
		// 	const { type: requestType = '' } = original || {};
		// 	return (
		// 		<span>
		// 			{ requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? <span>ICJV Approval </span>
		// 				: toTitleCase(requestType.replace(/_/g, ' ') || '-')}
		// 		</span>
		// 	);
		// },
	},
	{
		Header   : 'Invoices',
		accessor : 'invoices',
		id       : 'invoices',
		// Cell     : ({ row: { original } }) => {
		// 	const { source = '' } = original || {};
		// 	return <span>{startCase(source || '-')}</span>;
		// },
	},
	{
		Header   : 'Success Rate',
		accessor : 'success_rate',
		id       : 'success_rate',
		// Cell     : ({ row: { original } }) => {
		// 	const { source = '' } = original || {};
		// 	return <span>{startCase(source || '-')}</span>;
		// },
	},
];
