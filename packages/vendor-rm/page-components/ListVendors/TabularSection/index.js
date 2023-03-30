import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function TabularSection({
	data = {},
	columns = [],
	loading,
}) {
	if (!loading && isEmpty(data)) {
		return <div>Empty State</div>;
	}

	return (
		<div>
			<Table
				className={styles.table_container}
				columns={columns}
				data={data}
				loading={loading}
			/>
		</div>
	);
}

export default TabularSection;
