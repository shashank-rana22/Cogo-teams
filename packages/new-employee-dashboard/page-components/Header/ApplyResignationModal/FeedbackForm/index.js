import { DatepickerController, InputController, RadioGroupController } from '@cogoport/forms';
import React from 'react';

import EmployeeDetail from '../EmployeeDetail';

import styles from './styles.module.css';
import useFeedbackForm from './useFeedbackForm';

function FeedbackForm() {
	const { control, controls } = useFeedbackForm();

	return (
		<div className={styles.container}>
			<div className={styles.title}>Employee Feedback Form</div>

			<EmployeeDetail />

			<div className={styles.sub_text}>
				Hi, Shweta. When you submit this form, the owner will see your name and email address.
			</div>

			<div className={styles.style_controller}>
				<InputController
					control={control}
					label="primary factors influencing your decision to leave*"
					name="reason"
					placeholder="Enter your answer"
					rules={{ required: true }}
					style={{ width: '50%' }}
				/>

				<DatepickerController
					control={control}
					label="Last Working Day*"
					name="last_working_day"
					type="date"
					placeholder="Select your answer"
					rules={{ required: true }}
					style={{ width: '50%' }}
				/>
			</div>

			{controls.map((singleControl) => {
				switch (singleControl.type) {
					case 'text':
						return (
							<InputController
								control={control}
								{...singleControl}
							/>
						);
					case 'date':
						return (
							<DatepickerController
								control={control}
								{...singleControl}
							/>
						);
					case 'radioGroup':
						return (
							<RadioGroupController
								control={control}
								{...singleControl}
							/>
						);
					default:
						return null;
				}
			})}
		</div>
	);
}

export default FeedbackForm;
