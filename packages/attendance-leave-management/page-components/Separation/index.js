import { getByKey } from '@cogoport/utils';
import React, { useState } from 'react';

import FormComponent from './FormComponent';
import PersonalDetails from './PersonalDetails';
import styles from './styles.module.css';
import TaskList from './TaskList';
import useGetApplicationProcessDetails from './useGetApplicationProcessDetails';

function Separation() {
	const [currentComponent, setCurrentComponent] = useState('hr_meet');
	const { data, loading, refetchApplicationDetails, process_name } = useGetApplicationProcessDetails();

	// const {
	// 	hr_meet, manager_clearance, finance_clearance, hoto_clearance,
	// 	admin_clearance, tech_clearance,
	// } = data || {};

	const getStatus = (apiKey) => {
		console.log('apiKey', apiKey, getByKey(data, apiKey));
		if (getByKey(data, apiKey) === true) {
			return 'completed';
		}

		if (getByKey(data, apiKey) === false) {
			return 'active';
		}

		return 'pending';
	};

	const getMainStatus = (apiKey1, apiKey2) => {
		if (getByKey(data, apiKey1) === true && getByKey(data, apiKey2) === true) {
			return 'completed';
		}

		if (getByKey(data, apiKey1) === true || getByKey(data, apiKey2) === true
		|| getByKey(data, apiKey1) === false || getByKey(data, apiKey2) === false) {
			return 'active';
		}

		return 'pending';
	};

	const apiData = {
		hr_meet      : getStatus('hr_meet.hr_meet.is_complete'),
		rm_clearance : {
			rm_clearance: getMainStatus(
				'manager_clearance.assign_hoto.is_complete',
				'manager_clearance.review_request.is_complete',
			),
			review_request : getStatus('manager_clearance.review_request.is_complete'),
			assign_hoto    : getStatus('manager_clearance.assign_hoto.is_complete'),
		},
		finance_clearance : getStatus('finance_clearance.finance_clearance.is_complete'),
		hoto_clearance    : getStatus('hoto_clearance.hoto_clearance.is_complete'),
		admin_clearance   : getStatus('admin_clearance.admin_clearance.is_complete'),
		tech_clearance    : getStatus('tech_clearance.tech_clearance.is_complete'),
		exit_interview    : {
			exit_interview: getMainStatus(
				'exit_interview.exit_interview_scheduled.is_complete',
				'exit_interview.exit_interview_completed.is_complete',
			),
			interview_scheduled : getStatus('exit_interview.exit_interview_scheduled.is_complete'),
			interview_completed : getStatus('exit_interview.exit_interview_completed.is_complete'),
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Separation</div>

			<div className={styles.hr_separation}>
				<div className={styles.employee_details}>
					<PersonalDetails data={data} />
					<TaskList apiData={apiData} view_type={process_name} setCurrentComponent={setCurrentComponent} />
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
