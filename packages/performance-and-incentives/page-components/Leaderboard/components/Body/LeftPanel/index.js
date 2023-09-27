import { useSelector } from '@cogoport/store';

import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import styles from './styles.module.css';
import useGetScoringReports from './useGetAgentScoringReports';

const getSecondElement = ({ location_id, channel, id }) => {
	let secondElement = '';

	if (location_id && channel) {
		secondElement = location_id;
	} else if (channel) {
		secondElement = channel;
	} else {
		secondElement = id;
	}

	return secondElement;
};

function LeftPanel(props) {
	const {
		entity, params, setParams, isChannel, setIsChannel, debounceQuery, refetch: refetchStats, loading: statsLoading,
		setStatParams,
	} = props;

	const { incentive_leaderboard_viewtype: viewType, user = {} } = useSelector(({ profile }) => profile);

	const {
		loading,
		list,
		searchValue,
		setSearchValue,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
		isExpanded,
		setIsExpanded,
		refetch,
		view,
	} = useGetScoringReports({ params });

	console.log('currLevel :: ', currLevel);
	console.log('levelStack :: ', levelStack);

	const handlePropagation = ({ id = '', location_id, channel }) => {
		setParams((prev) => ({
			...prev,
			add_current_user_report : true,
			filters                 : {
				...prev.filters,
				report_type      : NEXT_LEVEL_MAPPING[currLevel.report_type],
				...((location_id && channel) ? { office_location_id: location_id } : { channel }),
				...((!location_id && !channel) ? { office_location_id: undefined, channel: undefined } : {}),
				report_view_type : undefined,
				user_rm_ids      : id ? [id] : undefined,
				current_user_id  : user.id,
			},
		}));

		setLevelStack((prev) => ([...prev, currLevel]));

		const secondElement = getSecondElement({ location_id, channel, id });

		setCurrLevel((prev) => ({ report_type: NEXT_LEVEL_MAPPING[prev.report_type], user: secondElement }));
	};

	return (
		<div className={styles.container}>
			<Header
				params={params}
				currLevel={currLevel}
				setParams={setParams}
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
				entity={entity}
				levelStack={levelStack}
			/>

			<LeaderboardFilters
				view={view}
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
				loading={loading}
				refetch={refetch}
				refetchStats={refetchStats}
				statsLoading={statsLoading}
				setStatParams={setStatParams}
			/>

			<List
				loading={loading}
				list={list}
				params={params}
				setParams={setParams}
				setStatParams={setStatParams}
				handlePropagation={handlePropagation}
				viewType={viewType}
				currLevel={currLevel}
				currentUserData={currentUserData}
			/>
		</div>
	);
}

export default LeftPanel;
