import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/components/EmptyState';

import styles from './styles.module.css';

function TabularSection({
	data = {},
	columns = [],
	loading,
}) {
	if (!loading && isEmpty(data)) {
		return <EmptyState />;
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
