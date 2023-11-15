import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import styles from './styles.module.css';

function LeftPanel(props) {
	const {
		list, listLoading, currentUserData, listRefetch, params, setParams,
		entity, isChannel, setIsChannel, debounceQuery, refetchStats, statsLoading,
		currLevel, setCurrLevel, levelStack, setLevelStack, lastUpdatedAt, getUserProgress,
		userPosition,
	} = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const [searchValue, setSearchValue] = useState('');

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				entity={entity}
				lastUpdatedAt={lastUpdatedAt}
			/>

			<LeaderboardFilters
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				isChannel={isChannel}
				setIsChannel={setIsChannel}
				listLoading={listLoading}
				listRefetch={listRefetch}
				refetchStats={refetchStats}
				statsLoading={statsLoading}
				getUserProgress={getUserProgress}
			/>

			<List
				listLoading={listLoading}
				list={list}
				viewType={viewType}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
				currentUserData={currentUserData}
				isChannel={isChannel}
				userPosition={userPosition}
			/>
		</div>
	);
}

export default LeftPanel;
