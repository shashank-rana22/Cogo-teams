import { Tabs, TabPanel } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getDashboardComponentsMapping from '../../constants/dashboard-components-mapping';

import styles from './styles.module.css';

function KamExpertise() {
	const { t } = useTranslation(['allocation']);
	const [activeMainTab, setActiveMainTab] = useState('global');

	const dashboardComponentsMapping = getDashboardComponentsMapping({ t });

	return (
		<section className={styles.container} id="kam_expertise_container">
			<section className={styles.heading_container}>
				{t('allocation:kam_expertise_heading')}
			</section>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeMainTab}
					themeType="secondary"
					onChange={setActiveMainTab}
				>
					{Object.values(dashboardComponentsMapping).map((item) => {
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
