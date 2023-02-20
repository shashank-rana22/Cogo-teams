import { Table } from '@cogoport/components';

import styles from './styles.module.css';

function TabularSection({ data = {}, columns = [], loading }) {
	return (
		<div>
			<Table className={styles.table_container} columns={columns} data={data} loading={loading} />
		</div>
	);
}

export default TabularSection;
