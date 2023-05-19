import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Header from './Header';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';

function ProfilePage() {
	const [activeTab, setActiveTab] = useState('profile_info');

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="profile_info" title="Profile Info">
						<div>This is local search</div>
						<ProfileDetails />
					</TabPanel>

					<TabPanel name="Signed_documents" title="Signed Documents">
						<div>This is suggested</div>
					</TabPanel>
				</Tabs>
			</div>

		</div>
	);
}

export default ProfilePage;
