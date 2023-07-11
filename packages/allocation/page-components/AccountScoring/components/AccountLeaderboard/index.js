import useGetAccountLeaderboardData from '../../hooks/useGetAccountLeaderboardData';

import HeaderFilters from './HeaderFilters/index';
import Leaderboard from './Leaderboard/index';
import ScoreDistributionGraph from './ScoreDistributionGraph/index';
import styles from './styles.module.css';

function AccountLeaderboard() {
	const {
		graphData,
		graphLoading,
		leaderboardLoading,
		leaderboardList,
		paginationData,
		getNextPage,
		control,
		filterControls,
		checkedRowsId,
		setCheckedRowsId = () => {},
		currentPageListIds = [],
		isAllChecked,
		setIsAllChecked = () => {},
		selectAllHelper = () => {},
		setLeaderboardParams = () => {},
		setValue = () => {},
		bulkDeallocateFilter,
		setBulkDeallocateFilter = () => {},
		refetch,
	} = useGetAccountLeaderboardData();

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<section className={styles.container}>
			<div className={styles.header_text}>Account Score Distribution</div>

			<HeaderFilters
				control={control}
				filterControls={filterControls}
			/>

			<ScoreDistributionGraph
				graphData={graphData}
				graphLoading={graphLoading}
			/>

			<Leaderboard
				leaderboardList={leaderboardList}
				leaderboardLoading={leaderboardLoading}
				page={page}
				page_limit={page_limit}
				total_count={total_count}
				getNextPage={getNextPage}
				checkedRowsId={checkedRowsId}
				setCheckedRowsId={setCheckedRowsId}
				currentPageListIds={currentPageListIds}
				isAllChecked={isAllChecked}
				setIsAllChecked={setIsAllChecked}
				selectAllHelper={selectAllHelper}
				setLeaderboardParams={setLeaderboardParams}
				setValue={setValue}
				bulkDeallocateFilter={bulkDeallocateFilter}
				setBulkDeallocateFilter={setBulkDeallocateFilter}
				refetch={refetch}
			/>
		</section>
	);
}

export default AccountLeaderboard;
