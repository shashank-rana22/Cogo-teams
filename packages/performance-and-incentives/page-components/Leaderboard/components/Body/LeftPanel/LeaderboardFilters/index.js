import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import SearchInput from '../../../../common/SearchInput';

import RefreshResults from './RefreshResults';
import styles from './styles.module.css';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

function LeaderboardFilters(props) {
	const {
		debounceQuery,
		searchValue,
		setSearchValue,
		levelStack,
		setLevelStack,
		currLevel,
		setCurrLevel,
		isChannel,
		setIsChannel,
		listLoading,
		listRefetch,
		refetchStats,
		statsLoading,
		getUserProgress,
	} = props;

	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const handleBack = () => {
		setCurrLevel(levelStack[GLOBAL_CONSTANTS.zeroth_index]);

		setLevelStack((prev) => {
			const curr = [...prev];
			curr.shift();

			return curr;
		});
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

				{!isEmpty(levelStack) && !currLevel.isExpanded ? (
					<div className={styles.back} role="presentation" onClick={handleBack}>
						<IcMArrowBack style={{ marginRight: '6px', cursor: 'pointer' }} />
						<div>
							Back
						</div>
					</div>
				) : null}

			</div>

			<div className={styles.inner_container}>
				<RefreshResults
					listLoading={listLoading}
					listRefetch={listRefetch}
					refetchStats={refetchStats}
					statsLoading={statsLoading}
					getUserProgress={getUserProgress}
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
