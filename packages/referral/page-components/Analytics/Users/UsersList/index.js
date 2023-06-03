import { Table } from '@cogoport/components';

import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function UserList({
	data = [],
	loading = false,
	setShowOptions = () => {},
	setShowActivityModal = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Users</div>
			<Table
				columns={TableColumns({ listType: 'users', setShowOptions, setShowActivityModal })}
				data={data}
				loadingRowsCount={10}
				loading={loading}
			/>
		</div>
	);
}
export default UserList;
