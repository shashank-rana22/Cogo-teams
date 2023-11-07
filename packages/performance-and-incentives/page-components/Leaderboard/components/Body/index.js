import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';
import useGetAgentScoringIncentiveUserStats from './useGetAgentScoringIncentiveUserStats';
import useGetAgentScoringReportStats from './useGetAgentScoringReportStats';
import useScoringReports from './useScoringReports';

function Body(props) {
	const { dateRange, entity, getUserProgress } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const [view] = viewType.split('_');

	const [levelStack, setLevelStack] = useState([]);
	const [currLevel, setCurrLevel] = useState({
		report_type   : `${view}_report`,
		location_id   : '',
		location_name : '',
		channel       : '',
		user          : {},
		user_rm_ids   : [],
		isExpanded    : false,
	});
	const [isChannel, setIsChannel] = useState(false);
	const [userPosition, setUserPosition] = useState(0);

	const {
		list,
		listLoading,
		currentUserData,
		params,
		setParams,
		debounceQuery,
		listRefetch,
		lastUpdatedAt,
	} = useScoringReports({ currLevel, dateRange, entity, isChannel, levelStack, setUserPosition });

	const {
		data, statsLoading, refetchStats,
	} = useGetAgentScoringReportStats({ dateRange, entity, currLevel, levelStack });

	const {
		userIncentiveData,
		userIncentiveStatsLoading,
		incentiveMonth,
		setIncentiveMonth,
	} = useGetAgentScoringIncentiveUserStats({ entity, currLevel, levelStack });

	return (
		<div className={styles.container}>
			<LeftPanel
				list={list}
				listLoading={listLoading}
				currentUserData={currentUserData}
				listRefetch={listRefetch}
				params={params}
				setParams={setParams}
				entity={entity}
				isChannel={isChannel}
				setIsChannel={setIsChannel}
				debounceQuery={debounceQuery}
				refetchStats={refetchStats}
				statsLoading={statsLoading}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
				lastUpdatedAt={lastUpdatedAt}
				getUserProgress={getUserProgress}
				userPosition={userPosition}
			/>

			<RightPanel
				data={data}
				statsLoading={statsLoading}
				entity={entity}
				currLevel={currLevel}
				levelStack={levelStack}
				incentiveMonth={incentiveMonth}
				setIncentiveMonth={setIncentiveMonth}
				userIncentiveData={userIncentiveData}
				userIncentiveStatsLoading={userIncentiveStatsLoading}
			/>
		</div>
	);
}

export default Body;
