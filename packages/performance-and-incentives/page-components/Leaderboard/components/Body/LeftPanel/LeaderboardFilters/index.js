import { Button, Badge, Toggle } from '@cogoport/components';
import { IcMFilter, IcMArrowBack } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Filters from '../../../../common/Filters';
import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

const OFFSET = 1;

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

function LeaderboardFilters(props) {
	const {
		setParams,
		debounceQuery,
		searchValue,
		setSearchValue,
		setEntity,
		levelStack,
		setCurrLevel,
		setLevelStack,
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
			filters: {
				...prev.filters,
				report_type : beforeLevel,
				user_rm_ids : id ? [id] : undefined,
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

				{false ? (
					<Toggle
						name="mode"
						size="md"
						onLabel="by Channel"
						offLabel="by Location"
						onChange={(e) => setEntity(!e?.target?.checked)}
					/>
				) : (
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
				)}

			</div>

			<div className={styles.inner_container}>
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
