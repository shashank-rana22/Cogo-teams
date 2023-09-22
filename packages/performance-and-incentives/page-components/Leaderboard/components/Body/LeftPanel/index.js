import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function LeftPanel(props) {
	const {
		list,
		params,
		setParams,
		loading,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
	} = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const handleClick = ({ id = '' }) => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				report_type : NEXT_LEVEL_MAPPING[currLevel[GLOBAL_CONSTANTS.zeroth_index]],
				user_rm_ids : [id],
			},
		}));

		setLevelStack((prev) => {
			const curr = [...prev];
			curr.push([currLevel[GLOBAL_CONSTANTS.zeroth_index], currLevel[GLOBAL_CONSTANTS.one]]);

			return curr;
		});

		setCurrLevel((prev) => [NEXT_LEVEL_MAPPING[prev[GLOBAL_CONSTANTS.zeroth_index]], id]);
	};

	return (
		<div className={styles.container}>
			<Header />

			{loading ? <LoadingState /> : (
				<>
					<LeaderboardFilters
						setCurrLevel={setCurrLevel}
						levelStack={levelStack}
						setLevelStack={setLevelStack}
						setParams={setParams}
					/>

					<List
						list={list}
						params={params}
						setParams={setParams}
						handleClick={handleClick}
						viewType={viewType}
						currLevel={currLevel}
						currentUserData={currentUserData}
					/>
				</>
			)}

		</div>
	);
}

export default LeftPanel;
