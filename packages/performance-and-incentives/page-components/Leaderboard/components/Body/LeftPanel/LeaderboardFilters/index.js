import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import SearchInput from '../../../../common/SearchInput';

import RefreshResults from './RefreshResults';
import styles from './styles.module.css';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const OFFSET = 1;

function containsOnlyLetters(inputString) {
	const PATTERN = GLOBAL_CONSTANTS.regex_patterns.alphabets;
	return PATTERN.test(inputString);
}

const getFilters = ({ beforeLevel, id }) => {
	const obj = { report_type: beforeLevel, user_rm_ids: undefined };

	if (beforeLevel === 'owner_report') {
		if (containsOnlyLetters(id)) {
			return {
				...obj,
				channel: id,
			};
		}

		return {
			...obj,
			office_location_id: id,
		};
	}

	return {
		report_type: beforeLevel,
	};
};

function LeaderboardFilters(props) {
	const { incentive_leaderboard_viewtype, user } = useSelector(({ profile }) => profile);

	const {
		view,
		setParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		levelStack,
		setCurrLevel,
		setLevelStack,
		isExpanded,
		isChannel,
		setIsChannel,
		loading,
		refetch,
		refetchStats,
		statsLoading,
		setStatParams,
	} = props;

	const { report_type: beforeLevel = '', user: id = '' } = levelStack[levelStack.length - OFFSET] || [];

	const [backText] = beforeLevel.split('_') || [];

	const handleBack = () => {
		setParams((prev) => ({
			...prev,

			...((levelStack.length === OFFSET && incentive_leaderboard_viewtype === ADMIN)
				? { add_current_user_report: false, current_user_id: undefined } : {}),

			filters: {
				...prev.filters,
				user_rm_ids: id ? [id] : undefined,

				...(levelStack.length === OFFSET ? {

					...(incentive_leaderboard_viewtype === ADMIN
						? {
							report_view_type: isChannel
								? 'channel_wise' : 'location_wise',
						} : { report_view_type: `${view}_wise` }),

					office_location_id: undefined,

					channel: undefined,

					...(incentive_leaderboard_viewtype === ADMIN
						? { report_type: undefined } : { report_type: `${view}_report` }),

				} : getFilters({ beforeLevel, id })),
			},
		}));

		setStatParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				user_id: incentive_leaderboard_viewtype !== ADMIN ? user.id : undefined,
			},
		}));

		setLevelStack((prev) => {
			const curr = [...prev];
			curr.pop();

			return curr;
		});

		// setCurrLevel([beforeLevel, id]);
		setCurrLevel({ report_type: beforeLevel, user: id });
	};

	return (
		<div className={styles.container}>
			<div className={styles.toggle_container}>
				{(isEmpty(levelStack) && incentive_leaderboard_viewtype === ADMIN) ? (
					<Toggle
						name="mode"
						size="md"
						onLabel="by Channel"
						offLabel="by Location"
						checked={isChannel}
						onChange={() => {
							setIsChannel((prev) => !prev);
						}}
					/>
				) : null}

				{!isEmpty(levelStack) && !isExpanded ? (
					<div className={styles.back}>
						<IcMArrowBack style={{ marginRight: '6px', cursor: 'pointer' }} onClick={handleBack} />
						<div>
							Back to
							{' '}
							{startCase(backText)}
							{' '}
							Leaderboard
						</div>
					</div>
				) : null}

			</div>

			<div className={styles.inner_container}>
				<RefreshResults
					loading={loading}
					refetch={refetch}
					refetchStats={refetchStats}
					statsLoading={statsLoading}
				/>

				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Name"
						debounceQuery={debounceQuery}
						value={searchValue}
						setGlobalSearch={setSearchValue}
					/>
				</div>

			</div>
		</div>
	);
}

export default LeaderboardFilters;
