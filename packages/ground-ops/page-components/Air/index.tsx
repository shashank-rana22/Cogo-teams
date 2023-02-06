import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Air() {
	const [activeTab, setActiveTab] = useState('cargo');

	return (
		<div className={styles.container}>
			<div style={{ marginTop: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="cargo" title="Cargo">
						<Air />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default Air;
