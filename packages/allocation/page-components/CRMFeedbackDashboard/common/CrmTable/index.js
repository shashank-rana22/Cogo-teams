import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';

function CrmTable({ columns, data, loading }) {
	if (isEmpty(data) && !loading) {
		return (
			<EmptyState
				height={280}
				width={440}
				emptyText="No records found"
				textSize="20px"
				flexDirection="column"
			/>
		);
	}

	return (
		<div className={styles.table_container}>

			<Table
				className={styles.table}
				columns={columns || []}
				data={data || []}
				loading={loading}
				loadingRowsCount={5}
			/>

		</div>
	);
}

export default CrmTable;
