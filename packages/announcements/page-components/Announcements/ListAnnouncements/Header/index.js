import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header({
	activeList,
	setActiveList,
}) {
	return (
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
	);
}

export default Header;
