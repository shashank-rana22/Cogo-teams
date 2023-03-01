import { TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import CurrentConfigurations from './CurrentConfigurations';
import styles from './styles.module.css';
import KamExpertiseScoreConfig from './Tabs/KamExpertiseScore';
import KamLevel from './Tabs/KamLevel';

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
	const router = useRouter();
	const [activeConfigTab, setActiveConfigTab] = useState('kam-expertise-score-config');

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	return (
		<section className={styles.main_container}>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					Configurations
				</div>

				<CurrentConfigurations />

				<div className={styles.tab_list}>
					<Tabs activeTab={activeConfigTab} themeType="secondary" onChange={setActiveConfigTab}>
						{Object.values(TAB_PANEL_MAPPING).map((item) => {
							const { name = '', title = '', Component } = item;

							return Component ? (
								<TabPanel key={name} name={name} title={title}>
									<Component />
								</TabPanel>
							) : null;
						})}
					</Tabs>
				</div>
			</section>
		</section>
	);
}

export default ViewAllConfigs;
