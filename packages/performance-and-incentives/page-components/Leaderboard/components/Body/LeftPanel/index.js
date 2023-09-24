import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import RefreshResults from './RefreshResults';
import styles from './styles.module.css';
import useGetScoringReports from './useGetAgentScoringReports';

function LeftPanel(props) {
	const { dateRange, entity } = props;

	const {
		params,
		setParams,
		loading,
		list,
		debounceQuery,
		searchValue,
		setSearchValue,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
		isExpanded,
		setIsExpanded,
		isChannel,
		setIsChannel,
		refetch,
	} = useGetScoringReports({ dateRange, entity });

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const handleClick = ({ id = '', location_id, channel }) => {
		setParams((prev) => ({
			...prev,
			add_current_user_report : true,
			filters                 : {
				...prev.filters,
				report_type      : NEXT_LEVEL_MAPPING[currLevel[GLOBAL_CONSTANTS.zeroth_index]],
				...((location_id && channel) ? { office_location_id: location_id } : { channel }),
				...((!location_id && !channel) ? { office_location_id: undefined, channel: undefined } : {}),
				report_view_type : undefined,
				user_rm_ids      : id ? [id] : undefined,
			},
		}));

		setLevelStack((prev) => {
			const curr = [...prev];
			curr.push([currLevel[GLOBAL_CONSTANTS.zeroth_index], currLevel[GLOBAL_CONSTANTS.one]]);

			return curr;
		});

		let secondElement = '';

		if (location_id && channel) {
			secondElement = location_id;
		} else if (channel) {
			secondElement = channel;
		} else {
			secondElement = id;
		}

		setCurrLevel((prev) => [NEXT_LEVEL_MAPPING[prev[GLOBAL_CONSTANTS.zeroth_index]], secondElement]);
	};

	return (
		<div className={styles.container}>
			<Header
				currLevel={currLevel}
				setParams={setParams}
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
			/>

			<LeaderboardFilters
				setParams={setParams}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				levelStack={levelStack}
				setCurrLevel={setCurrLevel}
				setLevelStack={setLevelStack}
				isExpanded={isExpanded}
				isChannel={isChannel}
				setIsChannel={setIsChannel}
			/>

			<RefreshResults loading={loading} refetch={refetch} />

			<List
				loading={loading}
				list={list}
				params={params}
				setParams={setParams}
				handleClick={handleClick}
				viewType={viewType}
				currLevel={currLevel}
				currentUserData={currentUserData}
			/>
		</div>
	);
}

export default LeftPanel;
