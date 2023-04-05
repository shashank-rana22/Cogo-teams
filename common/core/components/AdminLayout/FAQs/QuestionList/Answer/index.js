import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import {
	IcMRedo,
	IcMSad,
	IcMHappy,
	IcCHappy,
	IcCSad,
} from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import FeedbackForm from './FeedbackForm';
import Loader from './Loader';
import RelatedQuestion from './RelatedQuestion';
import styles from './styles.module.css';
import useAnswer from './useAnswer';

const FEEDBACK_MAPPING_ISLIKED = {
	true  : 'liked',
	false : 'disliked',
};

const LIKE_MAPPING = {
	liked    : <IcCHappy />,
	disliked : <IcMHappy />,
};

const DISLIKE_MAPPING = {
	liked    : <IcMSad />,
	disliked : <IcCSad />,
};

function Answer({ topic = {}, question, setQuestion }) {
	const {
		profile: { partner = '' },
	} = useSelector((state) => state);

	const { handleSubmit, control, watch } = useForm();

	const watchQuestionCheckbox = watch('question_checkbox');
	const watchAnswerCheckbox = watch('answer_checkbox');

	const [show, setShow] = useState(false);
	const [load, setload] = useState(true);

	const { data: answerData, loading, fetch } = useAnswer({ question });

	const [answer, setAnswer] = useState(answerData?.answers?.[0]?.answer);

	useEffect(() => {
		setAnswer(answerData?.answers?.[0]?.answer);
	}, [answerData]);

	const is_positive = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');

	const apiName = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading : feedbackLoading }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	}, { manual: true });

	const onClickLikeButton = async ({ _id }) => {
		setload(false);
		setIsLiked(isLiked === 'liked' ? '' : 'liked');
		setShow(false);
		try {
			let payload = {
				faq_answer_id : _id,
				is_positive   : true,
				status        : 'active',
			};
			if (isLiked === 'liked') {
				payload = {
					id     : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					status : 'inactive',
				};
			} else if (isLiked === 'disliked') {
				payload = {
					id          : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					is_positive : true,
					status      : 'active',
				};
			}

			await trigger({
				data: payload,
			});

			fetch();
		} catch (error) {
			Toast.error(error?.message);
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	const onClickRemoveDisLike = async () => {
		setload(false);
		setIsLiked('');

		try {
			await trigger({
				data: {
					id     : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					status : 'inactive',
				},
			});

			fetch();
		} catch (error) {
			Toast.error(error?.message);
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	const goToFAQ = () => {
		const { id: partnerId = '' } = partner || {};

		const aElement = document.createElement('a');
		aElement.setAttribute('href', `/v2/${partnerId}/learning/faq`);
		aElement.setAttribute('target', '_blank');

		const bodyElement = document.querySelector('body');
		bodyElement.appendChild(aElement);

		aElement.click();

		aElement.remove();
	};

	const onSubmit = async (values) => {
		setload(false);
		setIsLiked('disliked');

		let remark = values?.remark;

		if (values?.answer_checkbox) {
			remark = `Answer not satisfactory. ${remark}`;
		}
		if (values?.question_checkbox) {
			remark = `Question not satisfactory. ${remark}`;
		}

		let payload = {
			faq_answer_id               : answerData?.answers[0]?.id,
			is_positive                 : false,
			remark,
			status                      : 'active',
			suggested_question_abstract : watchQuestionCheckbox ? values?.question : undefined,
			suggested_answer            : watchAnswerCheckbox ? answer?.toString('html') : undefined,
		};
		if (answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
			payload = {
				id                          : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				faq_answer_id               : answerData?.answers[0]?.id,
				is_positive                 : false,
				remark,
				status                      : 'active',
				suggested_question_abstract : watchQuestionCheckbox ? values?.question : undefined,
				suggested_answer            : watchAnswerCheckbox ? answer?.toString('html') : undefined,
			};
		}

		try {
			await trigger({
				data: payload,
			});

			setShow(false);
			fetch();
		} catch (error) {
			Toast.error(error?.message);
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

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

						{answerData?.answers?.[0]?.upvote_count > 0 ? (
							<div className={styles.no_of_people_like_it} style={{ marginTop: 24 }}>
								{ answerData?.answers?.[0]?.upvote_count}
								{' '}
								people liked this answer
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
							onClickLikeButton({ _id: answerData?.answers?.[0]?.id });
						}}
						style={{ marginLeft: 8, cursor: 'pointer' }}
					>
						{LIKE_MAPPING[isLiked] || <IcMHappy />}
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
						{DISLIKE_MAPPING[isLiked] || <IcMSad />}
					</div>
				</div>
			</div>
			{show ? (
				<div className={styles.dislike_box}>
					<FeedbackForm
						answerData={answerData}
						control={control}
						answer={answer}
						setAnswer={setAnswer}
						watch={watch}
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
