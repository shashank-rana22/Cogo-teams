import React from 'react';

import OrganisationForm from '../../../../../common/OrganisationForm';

import styles from './styles.module.css';
import TextSection from './TextSection';

function Header({ organization, setOrganization, errors, setErrors }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<TextSection />
			</div>

			<div className={styles.right_section}>
				<OrganisationForm
					organization={organization}
					setOrganization={setOrganization}
					errors={errors}
					setErrors={setErrors}
				/>
			</div>
		</div>
	);
}

export default Header;
