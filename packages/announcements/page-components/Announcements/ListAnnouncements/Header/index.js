import { Button, TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import SearchInput from '../../../../commons/SearchInput';

import styles from './styles.module.css';

function Header({
	searchInput = '',
	setSearchInput = () => {},
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
						placeholder="Search an announcement"
					/>
				</div>
			</div>

			<div className={styles.tab_group}>
				<Tabs
					activeTab={activeList}
					themeType="primary"
					fullWidth
					onChange={setActiveList}
				>
					<TabPanel name="active" title="Active" />
					<TabPanel name="inactive" title="Inactive" />
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
