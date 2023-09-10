import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function PersonalDetails({ data = {} }) {
	const info = [
		{
			heading : 'BASIC INFORMATION',
			details : [
				{ label: 'First Name', key: 'processed', value: 'first_name' },
				{ label: 'Last Name', key: 'processed', value: 'last_name' },
				{ label: 'Email', key: 'details', value: 'cogoport_email' },
				{ label: 'Phone Number', key: 'details', value: 'mobile_number' },
				{ label: 'Personal Email', key: 'details', value: 'personal_email' },
				{ label: 'Alternate Number', key: 'details', value: 'alternate_mobile_number' }, //
				{ label: 'Gender', key: 'details', value: 'gender' },
				{ label: 'Date of Birth', key: 'details', value: 'date_of_birth' },
				{ label: 'Marital Status', key: 'personal', value: 'marital_status' },
				{ label: 'Blood Group', key: 'personal', value: 'blood_group' },
				{ label: 'Disability Level', key: 'personal', value: 'disability_level' },
				{ label: 'Allergies', key: 'personal', value: 'allergies' },
			],
		},
		{
			heading : 'FAMILY INFORMATION',
			details : [
				{ label: 'Fathers Name', key: 'family', value: 'father_name' },
				{ label: 'Mothers Name', key: 'family', value: 'mother_name' },
				{ label: 'Fathers Phone Number', key: 'family', value: 'father_mobile_number' },
				{ label: 'Mothers Phone Number', key: 'family', value: 'mother_mobile_number' },
				{ label: 'Are your parents senior citizens?', key: 'family', value: 'are_parents_senior_citizen' },
				{ label: 'Dependent/Disability', key: 'family', value: 'Dependent' },
				{ label: 'Guardians Name', key: 'family', value: 'guardian_name' },
				{ label: 'Guardians Phone Number', key: 'family', value: 'guardian_mobile_number' },
				{ label: 'Family Physician', key: 'family', value: 'family_physician_name' },
				{ label: 'Family Physician Phone Number', key: 'family', value: 'family_physician_mobile_number' },
			],
		},
		{
			heading : 'ADDRESS INFORMATION',
			details : [
				{ label: 'Address Line 1', key: 'address', value: 'address' },
				{ label: 'Address Line 2', key: 'address', value: '-' },
				{ label: 'City', key: 'address', value: 'city' },
				{ label: 'State', key: 'address', value: 'state' },
				{ label: 'Pincode', key: 'address', value: 'pincode' },
				{ label: 'Country', key: 'address', value: 'country' },
			],
		},
	];

	const otherInfo = [
		{ label: 'Joining Date', key: 'processed', value: 'date_of_joining' },
		{ label: 'Age in Organsization', key: 'processed', value: 'age_in_organization' },
		{ label: 'Reports To', key: 'details', value: 'reporting_manager_name' },
		{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
		{ label: 'Employee Code', key: 'details', value: 'employee_code' },
	];

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.heading}>
						<span className={styles.personal}>PERSONAL DETAILS</span>
						<span className={styles.detail}>View and manage employee details</span>
					</div>
					<Button size="md" themeType="secondary">
						<div className={styles.actions_container}>
							<span className={styles.button_text}>Edit</span>
							<IcMEdit width={12} height={12} />
						</div>
					</Button>
				</div>
				<div className={styles.info_container}>
					{info.map(({ heading, details }) => (
						<DetailsCard heading={heading} details={details} data={data} key={heading} />
					))}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} />
		</div>

	);
}

export default PersonalDetails;
