import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Heading from '../../common/Heading';

import Configurations from './AllocationConfigurations';
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

			<div style={{ margin: '16px 0px' }}>
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
						<div>Relations</div>
					</TabPanel>

					<TabPanel name="requests" title="Requests">
						<Requests />
					</TabPanel>

					<TabPanel name="quotas" title="Quotas">
						<div>Quotas</div>
					</TabPanel>
				</Tabs>
			</div>
		</section>
	);
}

export default CoreAllocationEngine;
