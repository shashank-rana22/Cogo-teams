import React from 'react';

import OrganisationForm from './OrganisationForm';
import styles from './styles.module.css';
import TextSection from './TextSection';

function Header({ organization, setOrganization, control, errors, watch, setValue }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}><TextSection /></div>

			<div className={styles.right_section}>
				<OrganisationForm
					organization={organization}
					setOrganization={setOrganization}
					control={control}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>
			</div>
		</div>
	);
}

export default Header;
