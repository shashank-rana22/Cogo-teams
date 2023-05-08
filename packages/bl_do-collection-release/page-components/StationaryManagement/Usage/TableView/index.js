import { Table } from '@cogoport/components';
import { format, upperCase } from '@cogoport/utils';

function TableView({ data = {}, loading }) {
	const { list = [] } = data || {};

	const columns = [
		{ Header: 'SID', accessor: 'serial_id' },
		{
			Header   : 'Used On',
			accessor : (row) => (row.bl_released_at ? format(row.bl_released_at, 'dd MMM yyyy') : '-'),
		},
		{ Header: 'BL Type', accessor: (row) => upperCase(row.bl_type || '-') },
		{ Header: 'Copies', accessor: 'bls_count' },
		{ Header: 'SO2', accessor: (row) => row?.service_ops2?.name || '-' },
	];

	return <Table onRowClick={false} data={list} columns={columns} loading={loading} />;
}

export default TableView;
