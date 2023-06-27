import { TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Header from './Header';
import useListIndividualKra from './hooks/useListIndividualKra';
import IndividualKraAssignment from './IndividualKraAssignment';
import styles from './styles.module.css';

function EditKRA() {
	const { data, loading, setActiveTab, activeTab } = useListIndividualKra();

	const router = useRouter();

	return (
		<div className={styles.container}>

			<div className={styles.header_content}>
				<div className={styles.back_arrow}>
					<IcMArrowBack width={22} height={22} style={{ marginRight: 2 }} onClick={() => router.back()} />
				</div>

				<div className={styles.title}>
					<h2>Edit KRA Request</h2>
				</div>
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
