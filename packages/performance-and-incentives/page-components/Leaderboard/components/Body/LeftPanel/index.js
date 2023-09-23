import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
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
				report_view_type : undefined,
				user_rm_ids      : id ? [id] : undefined,
			},
		}));

		setLevelStack((prev) => {
			const curr = [...prev];
			let firstElement = currLevel[GLOBAL_CONSTANTS.zeroth_index];

			if (isEmpty(prev)) {
				firstElement = params.filters?.report_view_type;
			}
			curr.push([firstElement, currLevel[GLOBAL_CONSTANTS.one]]);

			return curr;
		});

		let secondElement = '';

		if (id) {
			secondElement = id;
		} else if (channel) {
			secondElement = channel;
		} else if (location_id) {
			secondElement = location_id;
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
			/>

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
