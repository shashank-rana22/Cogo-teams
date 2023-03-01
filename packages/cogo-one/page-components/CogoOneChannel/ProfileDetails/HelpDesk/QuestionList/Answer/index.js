/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
// import InputController from '@cogo/business-modules/form/components/Controlled/InputController';
// import { useForm, useRequest } from '@cogo/commons/hooks';

import { Loader } from '@cogoport/components';
import { IcMArrowBack, IcMRedo } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useAnswer from '../../../../../../hooks/useAnswer';
import useUpdateFaqFeedback from '../../../../../../hooks/useUpdateFaqFeedback';
import DislikeModal from '../DislikeModal';

import styles from './styles.module.css';

const FEEDBACK_MAPPING = {
	true  : 'liked',
	false : 'disliked',
};

function Answer({ topic = {}, question, setQuestion }) {
	// const {
	// 	general: { scope = '' },
	// } = useSelector((state) => state);

	const [show, setShow] = useState(false);
	const [checkboxQ, setCheckboxQ] = useState();
	const [checkboxA, setCheckboxA] = useState();

	const { data, loading, fetch } = useAnswer({ question });
	console.log('data:', data);

	const answer = data?.answers?.[0]?.answer;
	const is_positive = data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING[is_positive] || '');

	const { onClickLikeDislikeButton = () => {} } = useUpdateFaqFeedback({ isLiked, setIsLiked, fetch, data });

	useEffect(() => {
		setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
	}, [loading]);

	// const {
	// 	handleSubmit,
	// 	formState: { errors },
	// 	control,
	// } = useForm();

	// const apiName = data?.answers?.[0]?.faq_feedbacks?.[0]?.id
	// 	? '/update_faq_feedback'
	// 	: '/create_faq_feedback';

	// const api = useRequest({
	// 	url    : apiName,
	// 	method : 'get',
	// }, { manual: true });

	// const [trigger] = useRequest({
	// 	url    : apiName,
	// 	method : 'get',
	// }, { manual: true });

	// const onClickLikeButton = async ({ id }) => {
	// 	let payload = {
	// 		faq_answer_id : id,
	// 		is_positive   : true,
	// 		status        : 'active',
	// 	};

	// 	if (isLiked === 'liked') {
	// 		payload = {
	// 			id     : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
	// 			status : 'inactive',
	// 		};
	// 	} else if (isLiked === 'disliked') {
	// 		payload = {
	// 			id          : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
	// 			is_positive : true,
	// 			status      : 'active',
	// 		};
	// 	}

	// 	try {
	// 		await trigger({
	// 			data: payload,
	// 		});

	// 		setIsLiked(isLiked === 'liked' ? '' : 'liked');

	// 		fetch();
	// 	} catch (error) {
	// 		console.log('error :: ', error);
	// 	}
	// };

	// const onClickRemoveDisLike = async () => {
	// 	// setload(false);
	// 	try {
	// 		trigger({
	// 			data: {
	// 				id     : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
	// 				status : 'inactive',
	// 			},
	// 		});

	// 		setIsLiked('');
	// 		fetch();
	// 	} catch (error) {
	// 		console.log('error :: ', error);
	// 	}
	// };

	const GotoFAQ = () => {
		// const router = useRouter();
		const href = '';
		// router.push(href, href);
		window.open(href, '_blank');
	};

	// const onSubmit = async (values) => {
	// 	// setload(false);
	// 	let remark = values?.remark;
	// 	if (checkboxA) {
	// 		remark = `Answer not satisfactory. ${remark}`;
	// 	}
	// 	if (checkboxQ) {
	// 		remark = `Question not satisfactory. ${remark}`;
	// 	}

	// 	let payload = {
	// 		faq_answer_id : data?.answers?.[0]?.id,
	// 		is_positive   : false,
	// 		remark,
	// 		status        : 'active',
	// 	};
	// 	if (data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
	// 		payload = {
	// 			id            : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
	// 			faq_answer_id : data?.answers?.[0]?.id,
	// 			is_positive   : false,
	// 			remark,
	// 			status        : 'active',
	// 		};
	// 	}

	// 	try {
	// 		await trigger({
	// 			data: payload,
	// 		});
	// 		setIsLiked('disliked');
	// 		setShow(false);
	// 		fetch();
	// 	} catch (error) {
	// 		console.log('error :: ', error);
	// 	}
	// };

	// const onClose = () => {
	// 	setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
	// 	setShow(false);
	// };

	return (
		<div className={styles.list}>
			<div>
				<div
					className={styles.title}
					onClick={() => setQuestion(null)}
				>
					<IcMArrowBack />
					<div className={styles.go_back}>Go Back</div>
				</div>
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
					<>
						<div className={styles.no_of_people_like_it} style={{ marginBottom: 24 }}>
							{data?.faq_topics?.[0]?.view_count
								? data?.faq_topics?.[0]?.view_count
								: '0'}
							{' '}
							people viewed this question
						</div>

						<div className={styles.ansofques}>
							<div dangerouslySetInnerHTML={{ __html: answer }} />
						</div>

						<div className={styles.no_of_people_like_it} style={{ marginTop: 24 }}>
							{data?.faq_topics?.[0]?.view_count
								? data?.faq_topics?.[0]?.view_count
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
					{isLiked === 'liked' ? (
						<>
							<div
								className={styles.emoji_like_yes}
								role="presentation"
								onClick={() => {
									onClickLikeDislikeButton({ id: data?.answers?.[0]?.id, type: 'like' });
								}}

							/>
							<div
								className={styles.emoji_dislike}
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
						</>
					) : null}

					{isLiked === 'disliked' ? (
						<>
							<div
								className={styles.emoji_like}
								role="presentation"
								onClick={() => {
									onClickLikeDislikeButton({ id: data?.answers?.[0]?.id, type: 'like' });
								}}
							/>

							<div
								className={styles.emoji_dislike_yes}
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
						</>
					) : null}

					{isLiked === '' ? (
						<>
							<div
								className={styles.emoji_like}
								role="presentation"
								onClick={() => {
									onClickLikeDislikeButton({ id: data?.answers?.[0]?.id, type: 'like' });
								}}
							/>

							<div
								className={styles.emoji_dislike}
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

						</>
					) : null}
				</div>

				<div
					className={styles.help_text}
					onClick={() => GotoFAQ()}
				>
					<div>Open in help center</div>
					<IcMRedo />
				</div>
			</div>

			{/* <Modal show={show} onClose={onClose} onOuterClick={() => {}}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Please provide the reason for your dislike</ModalHeader>
					<div>
						<CheckboxGroup>
							<CheckBox
								className="primary lg"
								checked={checkboxQ}
								onChange={setCheckboxQ}
							/>
							<div style={{ marginLeft: 8 }}>Question not satisfactory</div>
						</CheckboxGroup>

						<CheckboxGroup>
							<CheckBox
								className="primary lg"
								checked={checkboxA}
								onChange={setCheckboxA}
							/>
							<div style={{ marginLeft: 8 }}>Answer not satisfactory</div>
						</CheckboxGroup>
					</div>

					<div className="remark">
						<div className="title">Remarks</div>
						<InputController
							control={control}
							name="remark"
							type="text"
							placeholder="Enter remark here"
							rules={{ required: 'Remark is required' }}
						/>
						{errors.remark && (
							<span className="error">{errors.remark.message}</span>
						)}
					</div>
					<Button type="submit" loading={api?.loading}>
						Submit
					</Button>
				</Form>
			</Modal> */}

			{show && (
				<DislikeModal setShow={setShow} show={show} />
			)}

		</div>
	);
}

export default Answer;
