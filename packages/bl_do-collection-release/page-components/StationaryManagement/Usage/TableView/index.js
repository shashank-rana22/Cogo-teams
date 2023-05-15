import { Table } from '@cogoport/components';
import { format, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

const columns = [
	{
		Header   : 'SID',
		accessor : (row) => <span className={styles.serial_id}>{`#${row.serial_id}` }</span>,
	},
	{
		Header   : 'Used On',
		accessor : (row) => (row.used_at ? format(row.used_at, 'dd MMM yyyy') : '-'),
	},
	{ Header: 'BL Type', accessor: (row) => upperCase(row.bl_type || '-') },
	{ Header: 'Copies', accessor: 'bls_count' },
	{ Header: 'SO2', accessor: (row) => row?.service_ops2?.name || '-' },
];

function TableView({ data = {}, loading = false }) {
	const { list = [] } = data;

	return <Table onRowClick={false} data={list} columns={columns} loading={loading} />;
}

export default TableView;
