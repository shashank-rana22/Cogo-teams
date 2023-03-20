import { TabPanel, Tabs, Button } from '@cogoport/components';
import { IcMArrowDoubleDown, IcMArrowDoubleUp } from '@cogoport/icons-react';
import React from 'react';

import SearchInput from '../../../../../commons/SearchInput';

import FilterPopover from './FilterPopover';
import styles from './styles.module.css';

function Header({
	filters,
	setFilters,
	searchInput,
	setSearchInput,
	activeList,
	setActiveList,
	sortType,
	setSortType,
	requestedQuestionCount,
}) {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.search}>
					<SearchInput
						value={searchInput}
						onChange={setSearchInput}
						size="md"
						placeholder="Search a question"
					/>
				</div>

				<div className={styles.filter_popover}>
					<FilterPopover filters={filters} setFilters={setFilters} />
				</div>

				<div>
					<Button
						type="button"
						themeType="secondary"
						style={{ marginLeft: 8, height: '40px' }}
						size="md"
						onClick={() => { setSortType((prev) => !prev); }}
					>
						{activeList === 'requested' ? 'Sort By Last Created' : 'Sort By Last Updated'}
						{sortType ? <IcMArrowDoubleDown /> : <IcMArrowDoubleUp />}

					</Button>

				</div>
			</div>

			<div className={styles.tab_group}>
				<Tabs
					activeTab={activeList}
					themeType="primary"
					fullWidth
					onChange={setActiveList}
				>
					<TabPanel name="published" title="Published" />
					<TabPanel name="draft" title="Draft" />
					<TabPanel name="inactive" title="Inactive" />
					<TabPanel name="requested" title="New Requests" badge={requestedQuestionCount || ''} />
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
