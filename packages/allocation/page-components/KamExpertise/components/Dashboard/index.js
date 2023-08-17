import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import DASHBOARD_COMPONENTS_MAPPING from '../../constants/dashboard-components-mapping';

import styles from './styles.module.css';

function KamExpertise() {
	const [activeMainTab, setActiveMainTab] = useState('global');

	return (
		<section className={styles.container} id="kam_expertise_container">
			<section className={styles.heading_container}>
				KAM Expertise
			</section>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeMainTab}
					themeType="secondary"
					onChange={setActiveMainTab}
				>
					{Object.values(DASHBOARD_COMPONENTS_MAPPING).map((item) => {
						const {
							name = '',
							title = '',
							component: ActiveComponent = null,
						} = item || {};

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<ActiveComponent />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>

		</section>

	);
}

export default KamExpertise;
