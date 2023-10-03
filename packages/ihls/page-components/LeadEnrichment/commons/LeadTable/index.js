import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../commons/EmptyState';

import styles from './styles.module.css';

function LeadTable({ columns = [], data = [], loading = false, height = 280, width = 440 }) {
	if (isEmpty(data) && !loading) {
		return (
			<EmptyState
				height={height}
				width={width}
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
				columns={columns}
				data={data}
				loading={loading}
				loadingRowsCount={5}
			/>

		</div>
	);
}

export default LeadTable;
