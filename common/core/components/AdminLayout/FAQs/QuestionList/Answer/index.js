import { Toast } from '@cogoport/components';
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

import DisLikeBox from './DisLikeBox';
import Loader from './Loader';
import RelatedQuestion from './RelatedQuestion';
import styles from './styles.module.css';
import useAnswer from './useAnswer';

const FEEDBACK_MAPPING = {
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

	const [show, setShow] = useState(false);
	const [checkboxQ, setCheckboxQ] = useState(false);
	const [checkboxA, setCheckboxA] = useState(false);
	const [load, setload] = useState(true);

	const { data: answerData, loading: getQuestionLoading, fetch } = useAnswer({ question });

	const answer = answerData?.answers?.[0]?.answer;
	const is_positive = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING[is_positive] || '');

	useEffect(() => {
		setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
	}, [getQuestionLoading, is_positive]);

	const apiName = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading = false }, trigger] = useRequest({
		url    : apiName,
		method : 'post',
	}, { manual: true });

	const onClickLikeButton = async ({ id }) => {
		setload(false);

		let payload = {
			faq_answer_id : id,
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
		try {
			await trigger({
				data: payload,
			});

			setIsLiked(isLiked === 'liked' ? '' : 'liked');

			fetch();
		} catch (error) {
			Toast.error(error);
		}
	};

	const onClickRemoveDisLike = async () => {
		setload(false);

		try {
			await trigger({
				data: {
					id     : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					status : 'inactive',
				},
			});

			setIsLiked('');
			fetch();
		} catch (error) {
			Toast.error(error);
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

				{getQuestionLoading && load ? (
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
							onClickLikeButton({ id: answerData?.answers?.[0]?.id });
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
							} else {
								onClickRemoveDisLike();
							}
						}}
						style={{ marginLeft: 8, cursor: 'pointer' }}
					>
						{DISLIKE_MAPPING[isLiked] || <IcMSad />}
					</div>
				</div>

				{show ? (
					<DisLikeBox
						setShow={setShow}
						data={answerData}
						loading={loading}
						trigger={trigger}
						setIsLiked={setIsLiked}
						is_positive={is_positive}
						setCheckboxA={setCheckboxA}
						setCheckboxQ={setCheckboxQ}
						checkboxA={checkboxA}
						checkboxQ={checkboxQ}
						setload={setload}
						fetch={fetch}
					/>
				) : null}

				<div role="presentation" className={styles.open_faq} onClick={goToFAQ}>
					Open in Help Center
					<IcMRedo style={{ marginLeft: 8 }} />
				</div>

			</div>
		</div>
	);
}

export default Answer;
