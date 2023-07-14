/* eslint-disable no-undef */
import { Loader, cl } from '@cogoport/components';
import { IcMArrowBack, IcMRedo } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { FEEDBACK_MAPPING } from '../../../../../../constants';
import useAnswer from '../../../../../../hooks/useAnswer';
import useUpdateFaqFeedback from '../../../../../../hooks/useUpdateFaqFeedback';
import DislikeModal from '../DislikeModal';

import styles from './styles.module.css';

function Answer({ topic = {}, question, setQuestion }) {
	const [show, setShow] = useState(false);
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const { data, loading, fetch } = useAnswer({ question });

	const answer = data?.answers?.[0]?.answer;
	const is_positive = data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING[is_positive] || '');

	const {
		onClickLikeDislikeButton = () => {},
		modalLoading,
	} = useUpdateFaqFeedback({ isLiked, setIsLiked, fetch, data, setShow });

	useEffect(() => {
		setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const GotoFAQ = () => {
		const href = `/v2/${partnerId}/learning/faq`;
		window.open(href, '_blank');
	};

	return (
		<div className={styles.list}>
			<div>
				<div
					role="presentation"
					className={styles.title}
					onClick={() => setQuestion({})}
				>
					<IcMArrowBack width={16} height={16} className={styles.back} />
					<div className={styles.go_back}>Go Back</div>
				</div>
				<div className={styles.ans_container}>

					<div className={styles.module_text}>
						Module:
						{' '}
						{startCase(topic.display_name) || data?.faq_topics?.[0]?.display_name}
					</div>

					<div>
						<div className={styles.question}>
							{question?.question_abstract}
							?
						</div>
					</div>

					{loading ? (
						<div className={styles.spinner_container}>
							<Loader themeType="primary" />
						</div>
					) : (
						<div className={styles.ans_of_ques}>
							<div dangerouslySetInnerHTML={{ __html: answer }} />
						</div>
					)}

				</div>
			</div>

			<div className={styles.like_dislike_container}>

				<div className={styles.no_of_people_like_it}>
					{data?.view_count || 0}
					{' '}
					people viewed this question
				</div>

				<div className={styles.no_of_people_like_it}>
					{data?.answers?.[0]?.upvote_count || '0'}
					{' '}
					people liked this answer
				</div>

				<div className={styles.space} />

				<div className={styles.information_helpful}>
					<div className={styles.help_text}>Did this answer your question?</div>

					<div className={styles.show_buttons}>

						<div
							className={cl`
						${isLiked === 'liked' ? styles.emoji_like_yes : ''} 
						${isLiked === 'disliked' || isLiked === '' ? styles.emoji_like : ''}`}
							role="presentation"
							onClick={() => {
								onClickLikeDislikeButton({ id: data?.answers?.[0]?.id, type: 'like' });
							}}
						/>

						<div
							className={cl`
						${isLiked === 'liked' ? styles.emoji_dislike : ''} 
						${isLiked === 'disliked' ? styles.emoji_dislike_yes : ''}
						${isLiked === '' ? styles.emoji_dislike : ''}
						`}
							role="presentation"
							onClick={() => {
								if (isLiked !== 'disliked') {
									setShow(true);
									setIsLiked('disliked');
								} else {
									onClickLikeDislikeButton({ type: 'dislike' });
								}
							}}
						/>
					</div>

					<div
						role="presentation"
						className={styles.help_text}
						onClick={() => GotoFAQ()}
					>
						<div>No, go to help center</div>
						<IcMRedo />
					</div>
				</div>
			</div>
			{show && (
				<DislikeModal
					setShow={setShow}
					show={show}
					onClickLikeDislikeButton={onClickLikeDislikeButton}
					modalLoading={modalLoading}
					setIsLiked={setIsLiked}
					is_positive={is_positive}
				/>
			)}

		</div>
	);
}

export default Answer;
