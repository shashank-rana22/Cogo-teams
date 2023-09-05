import React from 'react';

import FormComponent from './FormComponent';
import PersonalDetails from './PersonalDetails';
import styles from './styles.module.css';
import TaskList from './TaskList';

function HRSeparation() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Separation</div>

			<div className={styles.hr_separation}>
				<div className={styles.employee_details}>
					<PersonalDetails />
					<TaskList />
				</div>

				<div className={styles.hr_meeting}>
					<FormComponent />
				</div>
			</div>
		</div>
	);
}

export default HRSeparation;
