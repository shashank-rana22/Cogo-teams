import React, { useState } from 'react';

import { getStepperMapping } from '../../utils/getStepperMapping';

import FormComponent from './FormComponent';
import PersonalDetails from './PersonalDetails';
import styles from './styles.module.css';
import TaskList from './TaskList';
import useGetApplicationProcessDetails from './useGetApplicationProcessDetails';

function Separation() {
	const [currentComponent, setCurrentComponent] = useState('hr_meet');
	const { data, loading, refetchApplicationDetails, process_name } = useGetApplicationProcessDetails();

	const stepperStatusMapping = getStepperMapping(data);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Separation</div>

			<div className={styles.hr_separation}>
				<div className={styles.employee_details}>
					<PersonalDetails data={data} />
					<TaskList
						apiData={stepperStatusMapping}
						view_type={process_name}
						getData={data}
						refetch={refetchApplicationDetails}
						setCurrentComponent={setCurrentComponent}
					/>
				</div>

				<div className={styles.hr_meeting}>
					<FormComponent
						data={data}
						loading={loading}
						refetchApplicationDetails={refetchApplicationDetails}
						view_type={process_name}
						currentComponent={currentComponent}
						setCurrentComponent={setCurrentComponent}
					/>
				</div>
			</div>
		</div>
	);
}

export default Separation;
