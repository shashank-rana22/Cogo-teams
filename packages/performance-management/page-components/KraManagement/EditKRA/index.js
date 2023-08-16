import { TabPanel, Tabs, Button } from '@cogoport/components';
import React from 'react';

import Header from './Header';
import useListIndividualKra from './hooks/useListIndividualKra';
import IndividualKraAssignment from './IndividualKraAssignment';
import styles from './styles.module.css';

function EditKRA() {
	const { data, loading, setActiveTab, activeTab, handleManageKRA, fetchIndividualKRA } = useListIndividualKra();

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.back_arrow}>

					<div className={styles.title}>
						<h2>Edit KRA Request</h2>
					</div>
				</div>

				<Button onClick={handleManageKRA}>Manage KRA</Button>
			</div>

			<Header data={data} />

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="individual" title="Individual">
						<div className={styles.individual_kra}>
							<IndividualKraAssignment
								data={data?.list}
								loading={loading}
								fetchIndividualKRA={fetchIndividualKRA}
							/>
						</div>
					</TabPanel>
				</Tabs>
			</div>

		</div>

	);
}

export default EditKRA;
