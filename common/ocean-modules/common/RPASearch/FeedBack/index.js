import { Button, Textarea, Checkbox } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useSubmitRPAFeedback from '../../../hooks/useRPASubmitFeedback';

import styles from './styles.module.css';

function FeedBack({ setTask }) {
	const [feedback, setFeedback] = useState('');
	const [isChecked, setIsChecked] = useState(true);

	const { submitRPAFeeback, feedBackApi } = useSubmitRPAFeedback({
		onSubmit: () => setTask('search_box'),
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div
					className={styles.back_button}
					role="button"
					tabIndex={0}
					onClick={() => {
						setTask('search_box');
					}}
				>
					<IcMArrowBack style={{ width: '1.5em', height: '1.5em' }} />
				</div>
				<div className={styles.heading}>GIVE FEEDBACK</div>
			</div>

			<div className={styles.styled_checkbox}>
				<Checkbox
					checked={isChecked}
					onChange={() => {
						setIsChecked(!isChecked);
					}}
				/>
				<div className={styles.text_feedback}>
					Do you want all your Cogoport Emails to be integrated ?
				</div>
			</div>

			<div className={styles.styled_textarea}>
				<div className={styles.remarks_textarea}>Remarks</div>
				<Textarea
					value={feedback}
					onChange={(e) => setFeedback(e)}
					rows={6}
					placeholder="Please input your feedback and we will try wor
					king to make this feature better for you."
				/>
			</div>

			<div className={styles.styled_button}>
				<div className={styles.cancel_button}>
					<Button
						className="secondary md"
						onClick={() => {
							setTask('search_box');
						}}
					>
						Cancel
					</Button>
				</div>
				<Button
					onClick={() => submitRPAFeeback(feedback, isChecked)}
					disabled={feedBackApi.loading}
				>
					{feedBackApi.loading ? 'Recording...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default FeedBack;
