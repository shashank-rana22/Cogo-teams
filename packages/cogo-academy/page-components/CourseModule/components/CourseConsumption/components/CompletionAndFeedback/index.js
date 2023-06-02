import { Button, RatingComponent, Textarea } from '@cogoport/components';
import { useState } from 'react';

import useCreateCourseFeedback from '../../hooks/useCourseFeedback';

import styles from './styles.module.css';

function CompletionAndFeedback() {
	const [starRating, setStarRating] = useState(0);
	const [feedback, setFeedback] = useState('');

	const { loading, createCourseFeedback } = useCreateCourseFeedback();

	return (
		<div className={styles.container}>

			<div className={styles.congrats}>

				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/resume.png"
						alt="resume.png"
					/>
				</div>

				<div>
					<h2>Congratulations!</h2>
					<p>You have successfully completed the &apos;Intro to Cogoport&apos; course!</p>
				</div>
			</div>

			<h3>
				Congratulations! You have successfully completed the entire course.
				You&apos;ve shown great dedication and commitment. Well done!
			</h3>

			<div className={styles.rating}>
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
				onClick={() => {
					createCourseFeedback({ rating: starRating, remark: feedback });
				}}
			>
				Submit

			</Button>

		</div>
	);
}

export default CompletionAndFeedback;
