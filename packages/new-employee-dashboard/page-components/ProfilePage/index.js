import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Header from './Header';
import ProfileDetails from './ProfileDetails';
import styles from './styles.module.css';
import useProfileDetails from './useProfileDetails';

function ProfilePage() {
	const [activeTab, setActiveTab] = useState('profile_info');
	const { data:profileData = {}, loading = false } = useProfileDetails();

	const { detail = {} } = profileData || {};

	return (
		<div className={styles.container}>
			<Header detail={detail} />

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="profile_info" title="Profile Info">
						<ProfileDetails profileData={profileData} loading={loading} />
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
