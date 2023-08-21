import { Button } from '@cogoport/components';

export const trailerColumns = ({ setShow, service_type, isForApproval }) => {
	const columns = [
		{ Header: 'Origin Location', accessor: (row) => (<div>{row?.expertise_data?.origin_name}</div>) },
		{ Header: 'Destination Location', accessor: (row) => (<div>{row?.expertise_data?.destination_name}</div>) },
		{
			Header   : 'Current Supplier (Total Count)',
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : 'Volume Served (Total Containers)',
			accessor : (row) => (<div>{row?.expertise_data?.total_volume_served?.total_teus}</div>),
		},

	];
	if (!isForApproval) {
		columns.push({
			Header   : ' ',
			accessor : (row) => (
				<Button
					themeType="accent"
					onClick={() => setShow({ ...row, service_type })}
					disabled={row?.service_requirement}
				>
					Evaluate
				</Button>
			)
			,
		});
	}
	return columns;
};
