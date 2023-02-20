import { Table } from '@cogoport/components';

import styles from './styles.module.css';

function TabularSection({ data = {}, columns = [] }) {
	return (
		<div>
			<Table className={styles.table_container} columns={columns} data={data} />
		</div>
	);
}

export default TabularSection;
