/* eslint-disable max-len */
import { Select, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function FeedbackComponent({ feedback = {}, setFeedback = () => {}, index = 0 }) {
	const feedbackObj = feedback;
	return (
		<div
			className={styles.container}
			style={{
				background: !isEmpty(feedback[index]?.feedback_type) ? '#fdebe9' : 'inherit',
			}}
		>
			<div className={styles.delete}>
				<IcMDelete
					height={20}
					width={20}
					onClick={() => {
						delete feedbackObj[index];
						setFeedback({ ...feedback });
					}}
				/>
			</div>

			<div className={styles.feedback_type}>
				<div>Select Feedback Type</div>
				<Select
					value={feedback[index]?.feedback_type}
					options={[
						{ label: 'General Feedback', value: 'general_feedback' },
						{ label: 'Credit Controller Feedback', value: 'credit_controller_feedback' },
					]}
					onChange={(val) => {
						const newFeedback = feedback;
						newFeedback[index].feedback_type = val;
						setFeedback({ ...newFeedback });
					}}
				/>
			</div>

			<div className={styles.feedback_data}>
				{feedback[index]?.feedback_type === 'credit_controller_feedback' && (
					<div>
						credit controller
					</div>
				)}
				{feedback[index]?.feedback_type === 'general_feedback' && (
					<div>
						<h4>General Feedback</h4>
						<Textarea
							name="general_feedback"
							size="md"
							style={{ height: '80px' }}
							onChange={(value) => {
								const newFeedback = feedback;
								newFeedback[index].feedback_data[GLOBAL_CONSTANTS.zeroth_index].general_feedback = value;
								setFeedback({ ...newFeedback });
							}}
						/>
					</div>
				)}
			</div>

		</div>
	);
}

export default FeedbackComponent;
