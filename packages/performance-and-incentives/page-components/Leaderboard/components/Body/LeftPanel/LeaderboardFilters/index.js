import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';

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
	} = props;

	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const { report_type: beforeLevel = '' } = levelStack[GLOBAL_CONSTANTS.zeroth_index] || [];

	const [backText] = beforeLevel.split('_') || [];

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
					<div className={styles.back}>
						<IcMArrowBack style={{ marginRight: '6px', cursor: 'pointer' }} onClick={handleBack} />
						<div>
							Back To
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
					listLoading={listLoading}
					listRefetch={listRefetch}
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
