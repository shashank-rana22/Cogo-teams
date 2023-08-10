import { Button, RatingComponent, Textarea } from '@cogoport/components';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import useCreateCourseFeedback from '../../hooks/useCourseFeedback';
import useUpdateCourseFeedback from '../../hooks/useUpdateCourseFeedback';

import styles from './styles.module.css';

function CompletionAndFeedback({ course_id, feedbackData = {}, name }) {
	const { rating = 0, remark = '', id = '' } = feedbackData || {};

	const { loading, createCourseFeedback } = useCreateCourseFeedback({ course_id });

	const { updateCourseFeedbackLoading, updateCourseFeedback } = useUpdateCourseFeedback();

	const [starRating, setStarRating] = useState(rating);
	const [feedback, setFeedback] = useState(remark);

	const onClickSubmit = () => {
		if (id) {
			updateCourseFeedback({ rating: starRating, remark: feedback, feedback_id: id });
			return;
		}

		createCourseFeedback({ rating: starRating, remark: feedback });
	};

	return (
		<div className={styles.container}>
			<div className={styles.congrats}>
				<Image
					width={732}
					height={150}
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/completed_course_confetti.svg"
					alt="course_completion.png"
				/>

				<div className={styles.congrats_text}>
					<h2>Congratulations!</h2>
					<div>
						You have successfully completed the &apos;
						{name}
						&apos; course!
					</div>
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
				onChange={setFeedback}
				placeholder="Please write your feedback here..."
				rows={8}
				cols={10}
			/>

			<Button
				size="md"
				themeType="primary"
				className={styles.btn}
				loading={updateCourseFeedbackLoading || loading}
				onClick={onClickSubmit}
			>
				Submit
			</Button>
		</div>
	);
}

export default CompletionAndFeedback;
