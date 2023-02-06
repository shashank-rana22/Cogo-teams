import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Air from './Air';
import Header from './Header';
import styles from './styles.module.css';

function GroundOps() {
	const [activeTab, setActiveTab] = useState('air');
	return (
		<div className={styles.container}>
			<Header />
			<div style={{ marginTop: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="air" title="Air">
						<Air />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default GroundOps;
