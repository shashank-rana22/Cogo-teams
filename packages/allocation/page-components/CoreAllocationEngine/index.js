import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Configurations from './components/AllocationConfigurations';
import Quotas from './components/AllocationQuotas';
import Relations from './components/AllocationRelations';
import Requests from './components/AllocationRequests';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {
	configurations: {
		name      : 'configurations',
		title     : 'Configurations',
		Component : Configurations,
	},
	relations: {
		name      : 'relations',
		title     : 'Relations',
		Component : Relations,
	},
	requests: {
		name      : 'requests',
		title     : 'Requests',
		Component :	Requests,
	},
	quotas: {
		name      : 'quotas',
		title     : 'Quotas',
		Component :	Quotas,
	},
};

function CoreAllocationEngine() {
	const [activeAllocation, setActiveAllocation] = useState('configurations');

	return (
		<section className={styles.container} id="core_engine_container">
			<section className={styles.heading_container}>
				Core Engine
			</section>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeAllocation}
					fullWidth
					themeType="primary"
					onChange={setActiveAllocation}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<Component />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</section>
	);
}

export default CoreAllocationEngine;
