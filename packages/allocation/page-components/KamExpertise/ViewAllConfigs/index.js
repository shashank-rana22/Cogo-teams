import { TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import KamExpertiseScoreConfig from './components/KamExpertiseScore';
import KamLevel from './components/KamLevel';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {
	configurations: {
		name      : 'kam-expertise-score-config',
		title     : 'Kam Expertise Score Config',
		Component : KamExpertiseScoreConfig,
	},
	relations: {
		name      : 'kam-level-config',
		title     : 'Kam Level Config',
		Component : KamLevel,
	},
};

function ViewAllConfigs() {
	const [activeConfigTab, setActiveConfigTab] = useState('kam-expertise-score-config');

	return (
		<section className={styles.main_container}>

			<div className={styles.back_container}>

				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>

				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					Current Configurations
				</div>

				<div className={styles.tab_list}>
					<Tabs activeTab={activeConfigTab} themeType="primary" onChange={setActiveConfigTab}>

						{Object.values(TAB_PANEL_MAPPING).map((item) => {
							const { name = '', title = '', Component } = item;

							return (
								<TabPanel key={name} name={name} title={title}>
									<Component />
								</TabPanel>
							);
						})}
					</Tabs>
				</div>

			</section>
		</section>
	);
}

export default ViewAllConfigs;
