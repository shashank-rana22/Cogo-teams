import { Button, Badge, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import Filters from '../../../../common/Filters';
import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';
import useFilterContent from './useFilterContent';

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

	return (
		<div className={styles.container}>
			<div className={styles.toggle_container}>
				<Toggle
					name="mode"
					size="md"
					onLabel="by Channel"
					offLabel="by Location"
					onChange={(e) => setEntity(!e?.target?.checked)}
				/>
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
