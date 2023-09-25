import { Button, Badge, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFilter, IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../constants/leaderboard-viewtype-constants';
import Filters from '../../../../common/Filters';
import SearchInput from '../../../../common/SearchInput';

import RefreshResults from './RefreshResults';
import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const OFFSET = 1;

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

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
	const { incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

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
	} = props;

	const {
		controls,
		formProps,
		showFilters,
		setShowFilters,
		handleReset,
		applyFilters,
		filtersApplied,
	} = useFilterContent({ setParams });

	const [beforeLevel = '', id] = levelStack[levelStack.length - OFFSET] || [];

	const [backText] = beforeLevel.split('_') || [];

	const handleBack = () => {
		setParams((prev) => ({
			...prev,

			...((levelStack.length === OFFSET && view === 'admin')
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

		setLevelStack((prev) => {
			const curr = [...prev];
			curr.pop();

			return curr;
		});

		setCurrLevel([beforeLevel, id]);
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

				<Filters
					controls={controls}
					open={showFilters}
					setOpen={setShowFilters}
					formProps={formProps}
					onClickOutside={() => setShowFilters(false)}
					applyFilters={applyFilters}
					reset={handleReset}
				>
					<Button
						themeType="secondary"
						type="button"
						size="md"
						onClick={() => setShowFilters(!showFilters)}
					>
						<div style={{ fontSize: '16px' }}>Filter</div>

						{conditionalWrapper({
							condition : filtersApplied,
							wrapper   : (children) => (
								<Badge color="red" size="md" text="">
									{children}
								</Badge>
							),
							children: <IcMFilter width={18} height={18} style={{ marginLeft: '4px' }} />,
						})}
					</Button>
				</Filters>

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
