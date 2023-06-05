import { Button, RatingComponent, Textarea } from '@cogoport/components';
import { useState } from 'react';

import useCreateCourseFeedback from '../../hooks/useCourseFeedback';
import useUpdateCourseFeedback from '../../hooks/useUpdateCourseFeedback';

import styles from './styles.module.css';

function CompletionAndFeedback({ course_id, feedbackData }) {
	const [starRating, setStarRating] = useState(feedbackData?.rating || 0);
	const [feedback, setFeedback] = useState(feedbackData?.remark || '');

	const { loading, createCourseFeedback } = useCreateCourseFeedback({ course_id });
	const { updateCourseFeedbackLoading, updateCourseFeedback } = useUpdateCourseFeedback();

	return (
		<div className={styles.container}>

			<div className={styles.congrats}>

				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/completed_course_confetti.svg"
						alt="course_completion.png"
					/>
				</div>

				<div className={styles.congrats_text}>
					<h2>Congratulations!</h2>
					<p>You have successfully completed the &apos;Intro to Cogoport&apos; course!</p>
				</div>
			</div>

			<h3 style={{ marginLeft: '30px' }}>
				Apply your newfound knowledge to excel in the field.
				You&apos;ve shown great dedication and commitment. Well done!
			</h3>

			<div className={styles.rating} style={{ marginLeft: '30px' }}>
				<div className={styles.rating_text}>
					Rate This Course.
					{' '}
					<span>This will help us improve our Courses.</span>
				</div>

				<RatingComponent
					type="star"
					totalStars={5}
					value={starRating}
					onChange={setStarRating}
				/>

			</div>

			<div className={styles.remarks}>Remarks (If Any) :</div>
			<Textarea
				name="feedback"
				size="md"
				value={feedback}
				onChange={(value) => setFeedback(value)}
				placeholder="Please write your feedback here..."
				rows={8}
				cols={10}
			/>

			<Button
				size="md"
				themeType="primary"
				className={styles.btn}
				loading={feedbackData?.id ? updateCourseFeedbackLoading : loading}
				onClick={() => {
					{ feedbackData?.id
						? updateCourseFeedback({ rating: starRating, remark: feedback, feedback_id: feedbackData?.id })
						: createCourseFeedback({ rating: starRating, remark: feedback }); }
				}}
			>
				Submit

			</Button>

		</div>
	);
}

export default CompletionAndFeedback;
