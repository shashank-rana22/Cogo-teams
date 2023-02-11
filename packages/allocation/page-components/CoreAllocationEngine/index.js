import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Configurations from './AllocationConfigurations';
import AllocationQuotas from './AllocationQuotas';
import Relations from './AllocationRelations';
import Requests from './AllocationRequests';
import styles from './styles.module.css';

function CoreAllocationEngine() {
	const [activeAllocation, setActiveAllocation] = useState('configurations');

	return (
		<section className={styles.container} id="core_engine_container">
			<section className={styles.heading_container}>
				<Heading
					title="Core Engine"
				/>
			</section>

			<div className={styles.tab_list}>
				{/* // Todo make it a mapping  with title,tab Component,key */}

				<Tabs
					activeTab={activeAllocation}
					fullWidth
					themeType="primary"
					onChange={setActiveAllocation}
				>
					<TabPanel name="configurations" title="Configurations">
						<Configurations />
					</TabPanel>

					<TabPanel name="relations" title="Relations">
						<Relations />
					</TabPanel>

					<TabPanel name="requests" title="Requests">
						<Requests />
					</TabPanel>

					<TabPanel name="quotas" title="Quotas">
						<AllocationQuotas />
					</TabPanel>
				</Tabs>
			</div>
		</section>
	);
}

export default CoreAllocationEngine;
