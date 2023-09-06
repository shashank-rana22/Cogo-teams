import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMTaskCompleted } from '@cogoport/icons-react';
import React from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';

import DatePicker from './DatePicker';
import InterviewQuestions from './InterviewQuestions';
import JoiningBonus from './JoiningBonus';
import NotesForManager from './NotesForManager';
import styles from './styles.module.css';

function HRMeeting() {
	const {
		control,
		watch,
		reset,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const v1 = watch();
	console.log('v1:', v1);

	const onSubmit = (values) => {
		console.log(values, 'formValues');
		reset();
	};
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left_header}>
					<span className={styles.upper_text}>HR MEETING</span>
					<span className={styles.lower_text}>Summary of application</span>
				</div>
				<div className={styles.logs_button}>
					<Button size="md" themeType="accent" onClick={() => handleSubmit(onSubmit)()}>
						<IcMTaskCompleted />
						<span style={{ marginLeft: '4px' }}>Notes & Logs</span>
					</Button>
				</div>
			</div>

			<EmployeeDetail />
			<DatePicker control={control} watch={watch} reset={reset} errors={errors} />
			<JoiningBonus control={control} errors={errors} />
			<InterviewQuestions control={control} errors={errors} />
			<NotesForManager control={control} />
		</>
	);
}

export default HRMeeting;
