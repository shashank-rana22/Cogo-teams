// import Spinner from '@cogo/project-partner/page-components/commons/Spinner';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Details from './Details';
import Header from './Header';
import Organization from './Organization';
import styles from './styles.module.css';
import useMyDetails from './useMyDetails';

function MyProfile() {
	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner || {};
	const {
		detailsData,
		refetch = () => {},
		loading = false,
	} = useMyDetails(partner_user_id);

	const [showMobileVerificationModal, setShowMobileVerificationModal] =		useState(false);

	if (loading) {
		return (
			// <SpinnerContainer>
			// 	<Spinner
			// 		size={50}
			// 		borderWidth={4}
			// 		outerBorderColor="#dce1ff"
			// 		spinBorderColor="#393f70"
			// 	/>
			// </SpinnerContainer>
			<>prachi</>
		);
	}

	return (
		<>
			<Header
				detailsData={detailsData}
				setRefetch={refetch}
				partner_user_id={partner_user_id}
			/>
			<Details
				detailsData={detailsData}
				refetch={refetch}
				showMobileVerificationModal={showMobileVerificationModal}
				setShowMobileVerificationModal={setShowMobileVerificationModal}
			/>

			<div className={styles.organization_container}>
				<div className={styles.organization}>ORGANIZATION HIERARCHY</div>
				<Organization personDetails={detailsData} />
			</div>
		</>
	);
}

export default MyProfile;
