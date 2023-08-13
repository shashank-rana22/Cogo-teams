import { Table } from '@cogoport/components';

import styles from './styles.module.css';

export default function ExportInvoices({ tableData = [], columns = [] }) {
	return (
		<div className={styles.list_container}>
			<Table columns={columns} data={tableData} />
		</div>
	);
}
