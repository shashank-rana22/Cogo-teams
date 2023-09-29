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
		currLevel, setCurrLevel, levelStack, setLevelStack,
	} = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const [searchValue, setSearchValue] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className={styles.container}>
			<Header
				params={params}
				setParams={setParams}
				levelStack={levelStack}
				currLevel={currLevel}
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
				entity={entity}
			/>

			<LeaderboardFilters
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
				setCurrLevel={setCurrLevel}
				isExpanded={isExpanded}
				isChannel={isChannel}
				setIsChannel={setIsChannel}
				listLoading={listLoading}
				listRefetch={listRefetch}
				refetchStats={refetchStats}
				statsLoading={statsLoading}
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
			/>
		</div>
	);
}

export default LeftPanel;
