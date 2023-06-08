import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import ScoreTrendModal from '../ScoreTrendModal';

import getLeaderBoardColumns from './LeaderboardListColumns';
import styles from './styles.module.css';

function Leaderboard(props) {
	const {
		leaderboardList,
		leaderboardLoading,
		page = 0,
		page_limit = 0,
		total_count = 0,
		getNextPage = () => {},
	} = props;

	const [scoreTrendIds, setScoreTrendIds] = useState({});

	if (isEmpty(leaderboardList) && !leaderboardLoading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					emptyText="Leaderboard Data not found"
					textSize={20}
				/>
			</div>
		);
	}

	return (
		<>
			<div className={styles.header_text}>Leaderboard List</div>
			<div className={styles.table_container}>
				<Table
					className={styles.table}
					columns={getLeaderBoardColumns({ setScoreTrendIds })}
					data={leaderboardList}
					loading={leaderboardLoading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>

			{!isEmpty(scoreTrendIds) && (
				<ScoreTrendModal
					scoreTrendIds={scoreTrendIds}
					setScoreTrendIds={setScoreTrendIds}
				/>
			)}
		</>
	);
}

export default Leaderboard;
