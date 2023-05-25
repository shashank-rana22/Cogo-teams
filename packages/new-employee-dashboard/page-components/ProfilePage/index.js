import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import useProfileDetails from '../hooks/useProfileDetails';

import AdditionalDetails from './AdditionalDetails';
import Header from './Header';
import CtcBreakupModal from './Header/CtcBreakupModal';
import ProfileDetails from './ProfileDetails';
import SignedDocuments from './SignedDocuments';
import styles from './styles.module.css';

function ProfilePage() {
	const [activeTab, setActiveTab] = useState('profile_info');
	const {
		data: profileData = {},
		loading = false,
		ctcStructure = {},
		// setCtcStructure = () => {},
		initialQuestion = '',
		setInitialQuestion = () => {},
		formProps = {},
		getEmployeeDetails,
	} = useProfileDetails();

	const { detail = {} } = profileData || {};

	const [showCtcBreakupModal, setShowCtcBreakupModal] = useState(false);
	return (
		<div className={styles.container}>
			<Header detail={detail} setShowCtcBreakupModal={setShowCtcBreakupModal} />

			<div className={styles.tab_container}>
				<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
					<TabPanel name="profile_info" title="Profile Info">
						<ProfileDetails
							profileData={profileData}
							loading={loading}
							getEmployeeDetails={getEmployeeDetails}
						/>
					</TabPanel>

					<TabPanel name="additional_info" title="Additional Info">
						<AdditionalDetails
							profileData={profileData}
							loading={loading}
							getEmployeeDetails={getEmployeeDetails}
						/>
					</TabPanel>

					<TabPanel name="Signed_documents" title="Signed Documents">
						<SignedDocuments
							profileData={profileData}
							loading={loading}
							getEmployeeDetails={getEmployeeDetails}
						/>
					</TabPanel>
				</Tabs>
			</div>

			{showCtcBreakupModal && (
				<CtcBreakupModal
					detail={detail}
					showCtcBreakupModal={showCtcBreakupModal}
					setShowCtcBreakupModal={setShowCtcBreakupModal}
					ctcStructure={ctcStructure}
					initialQuestion={initialQuestion}
					setInitialQuestion={setInitialQuestion}
					formProps={formProps}
				/>
			)}
		</div>
	);
}

export default ProfilePage;
