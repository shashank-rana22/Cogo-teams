/* eslint-disable jsx-a11y/no-static-element-interactions */
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

function Answer({ topic = {}, question }) {
	const {
		profile: { partner = '' },
	} = useSelector((state) => state);

	const [show, setShow] = useState(false);
	const [checkboxQ, setCheckboxQ] = useState(false);
	const [checkboxA, setCheckboxA] = useState(false);

	const api = useAnswer({ question });

	const answer = api?.data?.answers?.[0]?.answer;
	const is_positive = api?.data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING[is_positive] || '');
	useEffect(() => {
		setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api?.loading]);

	const apiName = api?.data?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? 'update_faq_feedback'
		: 'create_faq_feedback';

	const [{ data, loading }, trigger] = useRequest({
		url    : apiName,
		method : 'post',
	}, { manual: true });

	const onClickLikeButton = async ({ id }) => {
		let payload = {
			faq_answer_id : id,
			is_positive   : true,
			status        : 'active',
		};
		if (isLiked === 'liked') {
			payload = {
				id     : api?.data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				status : 'inactive',
			};
		} else if (isLiked === 'disliked') {
			payload = {
				id          : api?.data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
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
			console.log('error :: ', error);
		}
	};

	const onClickRemoveDisLike = async () => {
		// setload(false);
		try {
			await trigger({
				data: {
					id     : api?.data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
					status : 'inactive',
				},
			});

			setIsLiked('');
			fetch();
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const GotoFAQ = () => {
		const { id: partnerId = '' } = partner || {};

		const href = `/v2/${partnerId}/learning/faq`;

		// eslint-disable-next-line no-undef
		window.open(href);
	};

	return (
		<div className={styles.list}>
			<div>
				<div className={styles.module_text}>
					Topic:
					{' '}
					{startCase(topic.display_name) || api?.data?.faq_topics?.[0]?.display_name}
				</div>

				<div>
					<div className={styles.question}>
						{question?.question_abstract}
						?
					</div>
				</div>

				{loading ? (
					<Loader />
				) : (
					<>
						<div className={styles.no_of_people_like_it} style={{ marginBottom: 24 }}>
							{api?.data?.faq_topics?.[0]?.view_count
								? api?.data?.faq_topics?.[0]?.view_count
								: '0'}
							{' '}
							people viewed this question
						</div>

						<div className={styles.ansofques}>
							<div dangerouslySetInnerHTML={{ __html: answer }} />
						</div>

						<div className={styles.no_of_people_like_it} style={{ marginTop: 24 }}>
							{api?.data?.answers?.[0]?.upvote_count
								? api?.data?.answers?.[0]?.upvote_count
								: '0'}
							{' '}
							people liked this answer
						</div>
					</>
				)}
			</div>

			<div className={styles.space} />

			<div className={styles.information_helpful}>
				<div className={styles.help_text}>Did this answer your question?</div>

				<div className={styles.show_buttons}>
					<div
						className={styles.emoji_like}
						role="presentation"
						onClick={() => {
							onClickLikeButton({ id: data?.answers?.[0]?.id });
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
						data={api?.data}
						api={api}
						trigger={trigger}
						setIsLiked={setIsLiked}
						is_positive={is_positive}
						setCheckboxA={setCheckboxA}
						setCheckboxQ={setCheckboxQ}
						checkboxA={checkboxA}
						checkboxQ={checkboxQ}
					/>
				) : null}

				<div className={styles.open_faq} onClick={GotoFAQ}>
					Open in Help Center
					<IcMRedo style={{ marginLeft: 8 }} />
				</div>
			</div>
		</div>
	);
}

export default Answer;
