import { TabPanel, Tabs } from '@cogoport/components';
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
			</div>

			<div className={styles.tabGroup}>
				<Tabs
					activeTab={activeList}
					themeType="primary"
					fullWidth
					onChange={setActiveList}
				>
					<TabPanel name="published" title="Published" />
					<TabPanel name="draft" title="Draft" />
					<TabPanel name="inactive" title="Inactive" />
					<TabPanel name="requested" title="New Requests" />
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
