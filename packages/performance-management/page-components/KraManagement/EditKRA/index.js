import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import useListIndividualKra from './hooks/useListIndividualKra';
import IndividualKraAssignment from './IndividualKraAssignment';
import styles from './styles.module.css';

function EditKRA() {
	const { data, loading, setActiveTab, activeTab } = useListIndividualKra();

	return (
		<div className={styles.container}>

			<div className={styles.title}>
				<h2>Edit KRA Request</h2>
			</div>

			<Header data={data} />

			<div className={styles.container1}>
				<div className={styles.tab_container}>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="individual" title="Individual">
							<div className={styles.individual_kra}>
								<IndividualKraAssignment data={data?.list} loading={loading} />
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</div>

		</div>

	);
}

export default EditKRA;
