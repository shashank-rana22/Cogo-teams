import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetOfferLetter from '../hooks/useGetEmployeeOfferLetter';
import useProfileDetails from '../hooks/useProfileDetails';

import AdditionalDetails from './AdditionalDetails';
import Header from './Header';
import CtcBreakupModal from './Header/CtcBreakupModal';
import OfferLetter from './OfferLetter';
import ProfileDetails from './ProfileDetails';
import ReleaseDocuments from './ReleaseDocuments';
import SignedDocuments from './SignedDocuments';
import styles from './styles.module.css';

const TABS_MAPPING = {
	profile_info      : ProfileDetails,
	additional_info   : AdditionalDetails,
	offer_letter      : OfferLetter,
	Release_Documents : ReleaseDocuments,
	Signed_documents  : SignedDocuments,

};

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
		getEmployeeDetailsLoading,
		error = false,
		shareOfferLetter = '',
		setShareOfferLetter = () => {},
		setError = () => {},
	} = useProfileDetails();

	const {
		offerLetter,
		loading: offerLetterApiLoading,
		offerLetterApiRefetch,
	} = useGetOfferLetter();

	const { detail = {}, progress_stats = {} } = profileData || {};

	const { personal_details = {} } = progress_stats || {};

	return (
		<div className={styles.container}>
			<Header
				detail={detail}
				personalDetails={personal_details}
				loading={loading}
				setShowCtcBreakupModal={setShowCtcBreakupModal}
				getEmployeeDetails={getEmployeeDetails}
				offerLetter={offerLetter}
				offerLetterApiLoading={offerLetterApiLoading}
			/>

			<div className={styles.tab_container}>
				<Tabs activeTab={activeTab} themeType="primary" onChange={setActiveTab}>
					{(Object.keys(TABS_MAPPING) || []).map((tab) => {
						const Component = TABS_MAPPING[tab];
						return (
							<TabPanel name={tab} title={startCase(tab)} key={tab}>
								<Component
									profileData={profileData}
									loading={loading}
									getEmployeeDetails={getEmployeeDetails}
									getEmployeeDetailsLoading={getEmployeeDetailsLoading}
									offerLetter={offerLetter}
									setShowCtcBreakupModal={setShowCtcBreakupModal}
									offerLetterApiLoading={offerLetterApiLoading}
								/>
							</TabPanel>
						);
					})}
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
					offerLetterApiRefetch={offerLetterApiRefetch}
					error={error}
					setError={setError}
					shareOfferLetter={shareOfferLetter}
					setShareOfferLetter={setShareOfferLetter}

				/>
			)}
		</div>
	);
}

export default ProfilePage;
