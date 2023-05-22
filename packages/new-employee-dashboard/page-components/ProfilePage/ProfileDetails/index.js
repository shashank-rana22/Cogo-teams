import { Accordion } from '@cogoport/components';
import React from 'react';

import BankDetails from './BankDetails';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import Resume from './Resume';
import styles from './styles.module.css';
import useProfileDetails from './useProfileDetails';

function ProfileDetails() {
	const { data:profileData = {}, loading = false } = useProfileDetails();

	const data = [
		{ title: 'PERSONAL INFORMATION', content: <PersonalInformation profileData={profileData} /> },
		{ title: 'EDUCATIONAL QUALIFICATION', content: <EducationalQualifications profileData={profileData} /> },
		{ title: 'EMPLOYMENT HISTORY', content: <EmploymentHistory profileData={profileData} /> },
		{ title: 'IDENTIFICATION DOCUMENTS', content: <IdentificationDocuments profileData={profileData} /> },
		{ title: 'RESUME', content: <Resume profileData={profileData} /> },
		{ title: 'BANK DETAILS', content: <BankDetails /> }];

	return (
		<div className={styles.container}>
			{data.map((item) => (
				<div
					key={item.title}
					role="presentation"
					className={styles.accordion}
				>
					<Accordion
						type="text"
						title={item.title}
					>
						{item?.content}
						{' '}

					</Accordion>
				</div>
			))}
		</div>
	);
}

export default ProfileDetails;
