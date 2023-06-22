import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import Header from './Header';
import useListIndividualKra from './hooks/useListIndividualKra';
import IndividualKraAssignment from './IndividualKraAssignment';
import styles from './styles.module.css';

function EditKRA() {
	const [activeTab, setActiveTab] = useState('individual');

	const { data, loading } = useListIndividualKra();
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h2>KRA Edit Request</h2>
			</div>
			<div>
				<Header data={data} />
			</div>
			<div className={styles.container1}>
				<div className={styles.tab_container}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="kra_wise" title="KRA-Wise">
							<div>KRA-Wise</div>
						</TabPanel>

						<TabPanel name="individual" title="Individual">
							<div className={styles.individual_kra}>
								<IndividualKraAssignment data={data} loading={loading} />
							</div>
						</TabPanel>

						<TabPanel name="definition_change" title="Definition Change">
							<div>This is international rates</div>
						</TabPanel>
					</Tabs>
				</div>

			</div>
		</div>

	);
}

export default EditKRA;
