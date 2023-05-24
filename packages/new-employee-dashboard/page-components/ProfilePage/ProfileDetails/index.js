import { Accordion } from '@cogoport/components';
import React from 'react';

import IdentificationDocuments from './IdentificationDocuments';
import PersonalInformation from './PersonalInformation';
import styles from './styles.module.css';

function ProfileDetails({ profileData }) {
	const data = [
		{ title: 'PERSONAL INFORMATION', content: PersonalInformation },
		{ title: 'IDENTIFICATION DOCUMENTS', content: IdentificationDocuments },

	];

	return (
		<div className={styles.container}>
			{data.map((item) => {
				const { content: Component } = item;

				return (
					<div
						key={item.title}
						role="presentation"
						className={styles.accordion}
					>
						<Accordion
							type="text"
							title={item.title}
						>
							<Component profileData={profileData} />

							{' '}

						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default ProfileDetails;
