import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function FeedbackForm({ control }) {
	return (
		<div>
			<div className={styles.styled_component}>
				<div className={styles.label}>Provide Feedback Rating</div>

				<InputController
					name="feedback_rating"
					placeholder="Type your notes here..."
					control={control}
					size="md"
					style={{ width: '50%' }}
					rules={{ required: true }}
				/>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.label}>Notes shared with you</div>

				<InputController
					name="notes_shared"
					placeholder="Type your notes here"
					control={control}
					size="md"
					style={{ width: '50%' }}
					rules={{ required: true }}
				/>
			</div>
		</div>
	);
}

export default FeedbackForm;
