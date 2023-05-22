import { Accordion } from '@cogoport/components';
import React from 'react';

import BankDetails from './BankDetails';
import EducationalQualifications from './EducationalQualifications';
import EmploymentHistory from './EmploymentHistory';
import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import Resume from './Resume';
import styles from './styles.module.css';

function ProfileDetails({ profileData }) {
	const { bank_details, detail } = profileData || {};
	const { employee_experience_details = [], employee_education_details = [] } = detail || {};

	const data = [
		{ title: 'PERSONAL INFORMATION', content: <PersonalInformation detail={detail} /> },
		{
			title   : 'EDUCATIONAL QUALIFICATION',
			content : <EducationalQualifications
				employee_education_details={employee_education_details}
			/>,
		},
		{
			title   : 'EMPLOYMENT HISTORY',
			content : <EmploymentHistory
				employee_experience_details={employee_experience_details}
			/>,
		},
		{ title: 'IDENTIFICATION DOCUMENTS', content: <IdentificationDocuments profileData={profileData} /> },
		{ title: 'RESUME', content: <Resume profileData={profileData} /> },
		{ title: 'BANK DETAILS', content: <BankDetails bank_details={bank_details} /> }];

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
