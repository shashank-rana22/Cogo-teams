import { Accordion } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const data = [{ title: 'PERSONAL INFORMATION', content: 'PersonalInformation' },
	{ title: 'EDUCATIONAL QUALIFICATION', content: 'Personal Information' },
	{ title: 'EMPLOYMENT HISTORY', content: 'Personal Information' },
	{ title: 'IDENTIFICATION DOCUMENTS', content: 'Personal Information' },
	{ title: 'RESUME', content: 'Personal Information' },
	{ title: 'BANK DETAILS', content: 'Personal Information' }];

function ProfileDetails() {
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
						Personal Information
					</Accordion>
				</div>
			))}
		</div>
	);
}

export default ProfileDetails;
