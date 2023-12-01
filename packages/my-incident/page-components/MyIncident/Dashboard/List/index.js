import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../../Table';

import styles from './styles.module.css';

function List({ list = [], columns = [], loading = false }) {
	if (isEmpty(list)) { return <EmptyState />; }

	return (
		<div className={styles.list_container}>
			<StyledTable data={list} columns={columns} loading={loading} />
		</div>
	);
}
export default List;
