import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import OutStandingVisualization from './OutStandingVisualization';
import OverAllOutstanding from './OverAllOutstanding/index.tsx';
import styles from './styles.module.css';

function Outstanding({ entityCode = '' }) {
	const [activeTab, setActiveTab] = useState('overall_outstanding');

	return (
		<div className={styles.container}>
			<Tabs activeTab={activeTab} onChange={setActiveTab} themeType="primary">
				<TabPanel
					size={12}
					name="overall_outstanding"
					title="Overall Outstanding"
				>
					<div>
						<OverAllOutstanding entityCode={entityCode} />
					</div>
				</TabPanel>
				<TabPanel
					size={12}
					name="outstanding_visualization"
					title="Outstanding Visualization"
				>
					<OutStandingVisualization entityCode={entityCode} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Outstanding;
