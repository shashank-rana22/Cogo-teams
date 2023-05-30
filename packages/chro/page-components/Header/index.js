import { Input, Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Header({ search, setSearch, activeTab, setActiveTab }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				CHRO&#39;s Approval Dashboard

				<Input
					value={search}
					onChange={setSearch}
					size="md"
					style={{ width: 300, height: 40 }}
					placeholder="Search via Name or Email"
				/>
			</div>

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				style={{ marginTop: 12 }}
			>
				<TabPanel name="active" title="Pending" />
				<TabPanel name="approved" title="Approved" />
				<TabPanel name="rejected" title="Rejected" />
			</Tabs>
		</div>
	);
}

export default Header;
