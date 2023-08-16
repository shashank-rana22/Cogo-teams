import { Table } from '@cogoport/components';

import styles from './styles.module.css';

function StyledTable({ data = [], columns = [], loading = false }) {
	return (
		<div className={styles.table_container}>

			<Table
				className={styles.table_container}
				data={data}
				columns={columns}
				loading={loading}
			/>
		</div>
	);
}

export default StyledTable;
