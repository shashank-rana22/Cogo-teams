import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function ProfileDetails({ loading, profileData, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const { progress_stats = {}, documents } = profileData || {};
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
			name        : 'personal_information',
			content     : PersonalInformation,
			isCompleted : address_details && personal_information,
		},
		{
			name        : 'identification_documents',
			content     : IdentificationDocuments,
			isCompleted : identification_documents,
		},
	];

	const isDocsApproved = (documents || []).filter((doc) => (
		['aadhaar_card', 'pan_card'].includes(doc?.document_type))).every((ele) => (ele?.status === 'approved'));

	const renderPills = ({ name, isCompleted }) => {
		if (isCompleted) {
			return <Pill color="green">Completed</Pill>;
		}

		if (!isDocsApproved && name === 'identification_documents') {
			return <Pill color="orange">Approval Pending</Pill>;
		}

		return <Pill color="yellow">Pending</Pill>;
	};

	return (
		<div className={styles.container}>
			{data.map((item) => {
				const { content: Component, isCompleted, name } = item;

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
									<div className={styles.accordion_title}>{startCase(name)}</div>

									{renderPills({ name, isCompleted })}

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
