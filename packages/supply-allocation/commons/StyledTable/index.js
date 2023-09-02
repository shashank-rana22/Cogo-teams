import { Table } from '@cogoport/components';

import styles from './styles.module.css';

function StyledTable({ data = [], columns = [], loading = false }) {
	return (
		<div className={styles.table_container}>
			<Table
				data={data}
				columns={columns}
				loading={loading}
			/>
		</div>
	);
}

export default StyledTable;
