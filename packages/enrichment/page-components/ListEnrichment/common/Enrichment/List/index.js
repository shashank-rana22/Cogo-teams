import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function List({ columns, list, loading }) {
	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.table_container}>
				<EmptyState
					height={280}
					width={440}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>

			</div>

		);
	}

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table}
				columns={columns}
				data={list}
				loading={loading}
			/>
		</div>
	);
}

export default List;
