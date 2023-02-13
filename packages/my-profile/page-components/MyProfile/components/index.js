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

	const { name = '' } = detailsData || {};

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

	console.log('Mrutyunjaya B');

	return (
		<>

			<div className={styles.main_heading}>
				<span className={styles.span}>Welcome!</span>
				{' '}
				{name}
			</div>

			<div className={styles.main_container}>
				<div className={styles.container}>
					<div className={styles.header}>
						<Header
							detailsData={detailsData}
							setRefetch={refetch}
							partner_user_id={partner_user_id}
							showMobileVerificationModal={showMobileVerificationModal}
							setShowMobileVerificationModal={setShowMobileVerificationModal}
						/>
					</div>

					<div className={styles.details}>
						<Details
							detailsData={detailsData}
							refetch={refetch}
							showMobileVerificationModal={showMobileVerificationModal}
							setShowMobileVerificationModal={setShowMobileVerificationModal}
						/>

					</div>

				</div>

				<div>
					<div className={styles.organization_container}>
						<div className={styles.organization}>ORGANIZATION HIERARCHY</div>
						<Organization personDetails={detailsData} />
					</div>
				</div>
			</div>
		</>

	);
}

export default MyProfile;
