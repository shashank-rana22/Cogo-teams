import { useSelector } from '@cogoport/store';
import React from 'react';

import FormComponent from './FormComponent';
import PersonalDetails from './PersonalDetails';
import styles from './styles.module.css';
import TaskList from './TaskList';
import useGetApplicationProcessDetails from './useGetApplicationProcessDetails';

function Separation() {
	const { query } = useSelector((state) => state.general);

	const { data, loading, refetchApplicationDetails } = useGetApplicationProcessDetails();

	return (
		<div className={styles.container}>
			<div className={styles.title}>Separation</div>

			<div className={styles.hr_separation}>
				<div className={styles.employee_details}>
					<PersonalDetails data={data} />
					<TaskList />
				</div>

				<div className={styles.hr_meeting}>
					<FormComponent
						data={data}
						loading={loading}
						refetchApplicationDetails={refetchApplicationDetails}
						view_type={query?.process_name}
					/>
				</div>
			</div>
		</div>
	);
}

export default Separation;
