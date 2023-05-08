import { Table } from '@cogoport/components';

function TableView({ data, loading }) {
	const { list = [] } = data;
	const columns = [
		{ Header: 'Customer Name', accessor: 'organization_name' },
		{ Header: 'Copies', accessor: 'bl_count' },
		{ Header: 'Serial No. Start', accessor: (row) => row?.range?.[0] || '-' },
		{ Header: 'Serial No. End', accessor: (row) => row?.range?.[1] || '-' },
	];

	return (
		<Table
			columns={columns}
			loading={loading}
			data={list}
			layoutType="table"
			onRowSelect={false}
		/>

	);
}
export default TableView;
