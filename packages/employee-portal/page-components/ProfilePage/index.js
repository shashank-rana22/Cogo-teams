import { useState } from 'react';

import NewHireInformation from '../NewHireInformation';

import styles from './styles.module.css';

function ProfilePage() {
	const [informationPage, setInformationPage] = useState('');

	if (informationPage) {
		return <NewHireInformation setInformationPage={setInformationPage} />;
	}

	return (
		<div className={styles.container}>
			<p>Hello, Welcome to Cogoport!</p>
			<div>
				<div
					role="presentation"
					className={styles.options}
					onClick={() => setInformationPage('new_hire_information')}
				>
					New Hire Information
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
