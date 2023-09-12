import { SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: 1, value: 1 },
	{ label: 2, value: 2 },
	{ label: 3, value: 3 },
	{ label: 4, value: 4 },
	{ label: 5, value: 5 },
];

function FeedbackForm({
	control,
	errors = {},
	notes_shared_with_you = [],
	is_complete = false,
}) {
	return (
		<div>
			<div className={styles.styled_component}>
				<div className={styles.label}>Provide Feedback Rating</div>

				<SelectController
					name="feedback_rating"
					placeholder="Type your notes here..."
					control={control}
					size="md"
					options={OPTIONS}
					style={{ width: '50%' }}
					rules={{ required: true }}
					disabled={is_complete}
				/>
				{errors.feedback_rating ? <span className={styles.error}>*required</span> : null}
			</div>

			<div className={styles.styled_component}>
				<div className={styles.label} style={{ marginBottom: 20 }}>Notes shared with you</div>

				{(notes_shared_with_you || []).map((item) => (
					<div key={item} className={styles.notes}>
						<div>
							Q.)
							{' '}
							{item?.label}
						</div>
						<div className={styles.answer}>
							A.)
							{' '}
							{item?.value || '-'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FeedbackForm;
