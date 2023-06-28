import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo, useEffect, useCallback } from 'react';

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
	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [isAllChecked, setIsAllChecked] = useState(false);

	const currentPageListIds = useMemo(() => leaderboardList
		.filter(({ warmth }) => warmth === 'ice_cold' || warmth === 'cold')
		.map(({ user_id }) => user_id), [leaderboardList]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));
		if (isRowsChecked !== isAllChecked) {
			setIsAllChecked(isRowsChecked);
		}
	}, [currentPageListIds, isAllChecked]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	}, [currentPageListIds, selectAllHelper, checkedRowsId]);

	const columns = getLeaderBoardColumns({
		setScoreTrendIds,
		checkedRowsId,
		setCheckedRowsId,
		currentPageListIds,
		isAllChecked,
		setIsAllChecked,
	});

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
					columns={columns}
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
