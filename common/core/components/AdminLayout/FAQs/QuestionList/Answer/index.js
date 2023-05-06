import { Button } from '@cogoport/components';
import {
	IcMRedo,
	IcMVerySad,
	IcMVeryHappy,
	IcCVeryHappy,
	IcCVerySad,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import FeedbackForm from './FeedbackForm';
import useCreateFeedback from './hooks/useCreateFeedback';
import Loader from './Loader';
import RelatedQuestion from './RelatedQuestion';
import styles from './styles.module.css';

const LIKE_MAPPING = {
	liked    : <IcCVeryHappy />,
	disliked : <IcMVeryHappy />,
};

const DISLIKE_MAPPING = {
	liked    : <IcMVerySad />,
	disliked : <IcCVerySad />,
};

function Answer({ topic = {}, question, setQuestion }) {
	const {
		handleSubmit = () => {},
		control,
		show,
		load,
		loading,
		errors,
		feedbackLoading,
		onClickLikeButton = () => {},
		onClickRemoveDisLike = () => {},
		onSubmit = () => {},
		goToFAQ = () => {},
		answerData,
		isLiked,
		setShow = () => {},
		setIsLiked = () => {},
		watchAnswerCheckbox,
		watchQuestionCheckbox,
		watchRemark,
		is_positive,
		FEEDBACK_MAPPING_ISLIKED,
	} = useCreateFeedback({ question });

	const { id:answerId, answer, upvote_count } = answerData?.answers?.[0] || {};

	return (
		<div className={styles.list}>
			<div>
				<div className={styles.module_text}>
					Topic:
					{' '}
					{startCase(topic.display_name) || answerData?.faq_topics?.[0]?.display_name}
				</div>

				<div>
					<div className={styles.question}>
						{question?.question_abstract}
					</div>
				</div>

				{loading && load ? (
					<Loader />
				) : (
					<>
						<div className={styles.no_of_people_like_it} style={{ marginBottom: 24 }}>
							{answerData?.view_count || '0'}
							{' '}
							people viewed this question
						</div>

						<div className={styles.ansofques}>
							<div dangerouslySetInnerHTML={{ __html: answer }} />
						</div>

						{upvote_count > 0 ? (
							<div className={styles.no_of_people_like_it} style={{ marginTop: 24 }}>
								{ upvote_count}
								{' '}
								{upvote_count === 1 ? 'person' : 'people'}
								{' '}
								liked this answer
							</div>
						) : null}
					</>
				)}
			</div>

			<RelatedQuestion
				query_name={answerData?.query_name}
				question_abstract={answerData?.question_abstract}
				setQuestion={setQuestion}
				question={question}
			/>

			<div className={styles.space} />

			<div className={styles.information_helpful}>
				<div className={styles.help_text}>Did this answer your question?</div>

				<div className={styles.show_buttons}>
					<div
						className={styles.emoji_like}
						role="presentation"
						onClick={() => {
							onClickLikeButton({ answerId });
						}}
						style={{ marginLeft: 8, cursor: 'pointer' }}
					>
						{LIKE_MAPPING[isLiked] || <IcMVeryHappy />}
					</div>

					<div
						className={styles.emoji_dislike}
						role="presentation"
						onClick={() => {
							if (isLiked !== 'disliked') {
								setShow(true);
								setIsLiked('disliked');
							} else if (!show) {
								onClickRemoveDisLike();
							}
						}}
						style={{ marginLeft: 8, cursor: 'pointer' }}
					>
						{DISLIKE_MAPPING[isLiked] || <IcMVerySad />}
					</div>
				</div>
			</div>
			{show ? (
				<div className={styles.dislike_box}>
					<FeedbackForm
						errors={errors}
						answerData={answerData}
						control={control}
						watchAnswerCheckbox={watchAnswerCheckbox}
						watchQuestionCheckbox={watchQuestionCheckbox}
					/>
					<div className={styles.footer_btns}>
						<Button
							style={{ marginRight: '10px' }}
							size="md"
							themeType="secondary"
							onClick={() => {
								setShow(false);
								setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
							}}
							disabled={feedbackLoading}
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="primary"
							onClick={handleSubmit(onSubmit)}
							loading={feedbackLoading}
							disabled={!(watchAnswerCheckbox || watchQuestionCheckbox || watchRemark)}
						>
							Submit
						</Button>
					</div>
				</div>
			) : null}

			<div role="presentation" className={styles.open_faq} onClick={goToFAQ}>
				Open in Help Center
				<IcMRedo style={{ marginLeft: 8 }} />
			</div>

		</div>
	);
}

export default Answer;
