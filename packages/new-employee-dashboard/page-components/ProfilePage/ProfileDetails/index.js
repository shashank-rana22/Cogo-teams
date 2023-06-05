import { Accordion, Pill } from '@cogoport/components';
import React from 'react';

import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function ProfileDetails({ loading, profileData, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const { progress_stats = {} } = profileData || {};
	const {
		personal_details = {},
	} = progress_stats;

	const {
		address_details = false,
		identification_documents = false,
		personal_information = false,
	} = personal_details;
	const data = [
		{
			title     : 'PERSONAL INFORMATION',
			content   : PersonalInformation,
			isPending : address_details && personal_information,
		},
		{
			title:
			'IDENTIFICATION DOCUMENTS',
			content   : IdentificationDocuments,
			isPending : identification_documents,
		},
	];

	return (
		<div className={styles.container}>
			{data.map((item) => {
				const { content: Component, isPending } = item;

				return (
					<div
						key={item.title}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={(
								<div className={styles.status}>
									<div className={styles.accordion_title}>{item.title}</div>

									{isPending
										? <Pill color="green">Completed</Pill>
										: <Pill color="yellow">Pending</Pill>}

								</div>
							)}
							animate={false}
						>
							<Component
								mainApiLoading={loading}
								profileData={profileData}
								getEmployeeDetails={getEmployeeDetails}
								getEmployeeDetailsLoading={getEmployeeDetailsLoading}
							/>
							{' '}
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default ProfileDetails;
