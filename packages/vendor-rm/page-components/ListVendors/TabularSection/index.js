import { Table } from '@cogoport/components';

import styles from './styles.module.css';

function TabularSection({ data = {}, columns = [] }) {
	const { list = [] } = data;

	return (
		<div>
			<Table className={styles.table_container} columns={columns} data={list} />
		</div>
	);
}

export default TabularSection;
