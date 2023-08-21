import { Button } from '@cogoport/components';

export const chaColumns = ({ setShow, service_type, isForApproval }) => {
	const columns = 	[
		{ Header: 'Location', accessor: (row) => (<div>{row?.expertise_data?.location_name}</div>) },
		{
			Header   : 'No. of Existing CHA',
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
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
