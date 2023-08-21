import { Button } from '@cogoport/components';

export const cfsColumns = ({ setShow, service_type, isForApproval }) => {
	const columns = [
		{ Header: 'CFS/ICD', accessor: (row) => (<div>{row?.expertise_data?.location_name}</div>) },
		{
			Header   : 'Container Type',
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : 'Rate Provided',
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : 'No. of Existing Suppliers',
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
