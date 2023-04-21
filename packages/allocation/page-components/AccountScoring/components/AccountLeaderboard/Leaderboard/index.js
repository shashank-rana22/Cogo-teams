import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function index(props) {
	const { columns = [], leaderboardList, leaderboardLoading } = props;

	if (isEmpty(leaderboardList)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="row"
					emptyText="Bias Data not found"
					textSize={20}
				/>
			</div>
		);
	}
	return (
		<>
			<div className={styles.header_text}>Leaderboard List</div>
			<div style={{ margin: '16px 0px' }}>
				<Table
					className={styles.table}
					columns={columns}
					data={leaderboardList}
					loading={leaderboardLoading}
				/>
			</div>
		</>
	);
}

export default index;
