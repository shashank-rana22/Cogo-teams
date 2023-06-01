import { Tabs, TabPanel } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetOfferLetter from '../hooks/useGetEmployeeOfferLetter';
import useProfileDetails from '../hooks/useProfileDetails';

import AdditionalDetails from './AdditionalDetails';
import Header from './Header';
import CtcBreakupModal from './Header/CtcBreakupModal';
import ViewCtcBreakup from './Header/ViewCtcBreakup';
import ProfileDetails from './ProfileDetails';
import SignedDocuments from './SignedDocuments';
import styles from './styles.module.css';

function ProfilePage() {
	const [activeTab, setActiveTab] = useState('profile_info');
	const [showCtcBreakupModal, setShowCtcBreakupModal] = useState(false);

	const {
		data: profileData = {},
		loading = false,
		ctcStructure = {},
		initialQuestion = '',
		setInitialQuestion = () => {},
		formProps = {},
		getEmployeeDetails,
	} = useProfileDetails();

	const { offerLetter, loading: offerLetterApiLoading } = useGetOfferLetter();
	const { metadata } = offerLetter || {};

	const { detail = {} } = profileData || {};

	return (
		<div className={styles.container}>
			<Header
				detail={detail}
				loading={loading}
				setShowCtcBreakupModal={setShowCtcBreakupModal}
				getEmployeeDetails={getEmployeeDetails}
				offerLetter={offerLetter}
				offerLetterApiLoading={offerLetterApiLoading}
			/>

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
				isEmpty(offerLetter)
					? (
						<CtcBreakupModal
							detail={detail}
							showCtcBreakupModal={showCtcBreakupModal}
							setShowCtcBreakupModal={setShowCtcBreakupModal}
							ctcStructure={ctcStructure}
							initialQuestion={initialQuestion}
							setInitialQuestion={setInitialQuestion}
							formProps={formProps}
						/>
					) : (
						<ViewCtcBreakup
							metadata={metadata}
							setShowCtcBreakupModal={setShowCtcBreakupModal}
							showCtcBreakupModal={showCtcBreakupModal}
						/>
					)
			)}
		</div>
	);
}

export default ProfilePage;
