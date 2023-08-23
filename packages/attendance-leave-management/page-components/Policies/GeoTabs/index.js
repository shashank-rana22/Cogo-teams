import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Manage from '../Manage/Manage';

import styles from './styles.module.css';

function GeoTabs() {
	const [activeTab, setActiveTab] = useState('manage');
	return (
		<div className={styles.card}>
			{' '}
			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={setActiveTab}
				>
					<TabPanel name="manage" title="Manage" />

					<TabPanel name="assign" title="Assign" />

				</Tabs>
			</div>
			{activeTab === 'manage' ? <Manage /> : <h1>ok</h1>}
		</div>

	);
}

export default GeoTabs;
