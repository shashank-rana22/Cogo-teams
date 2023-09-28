import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../constants/leaderboard-viewtype-constants';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import useGetAgentScoringReportStats from './RightPanel/useGetAgentScoringReportStats';
import styles from './styles.module.css';
import useScoringReports from './useScoringReports';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

function Body(props) {
	const { dateRange, entity } = props;

	const { incentive_leaderboard_viewtype: viewType, user: loggedUser } = useSelector(({ profile }) => profile);

	const [view] = viewType.split('_');

	const [levelStack, setLevelStack] = useState([]);
	const [currLevel, setCurrLevel] = useState({
		report_type   : `${view}_report`,
		location_id   : '',
		location_name : '',
		channel       : '',
		user          : viewType === ADMIN ? {} : loggedUser,
		user_rm_ids   : [],
	});
	const [isChannel, setIsChannel] = useState(false);

	console.log('levelStack :: ', levelStack);
	console.log('currLevel :: ', currLevel);

	const {
		list,
		listLoading,
		currentUserData,
		params,
		setParams,
		debounceQuery,
		listRefetch,
	} = useScoringReports({ currLevel, setCurrLevel, dateRange, entity, isChannel, levelStack, setLevelStack });

	const {
		data, statsLoading, refetchStats,
	} = useGetAgentScoringReportStats({ dateRange, entity, currLevel });

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
			/>

			<RightPanel
				data={data}
				statsLoading={statsLoading}
				entity={entity}
				currLevel={currLevel}
			/>
		</div>
	);
}

export default Body;
