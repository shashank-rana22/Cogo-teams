/* eslint-disable react/no-danger */
import { Modal, Button, Badge, Pill, Toast } from '@cogoport/components';
import { InputController, CheckboxController, useForm } from '@cogoport/forms';
import { IcCLike, IcCDislike, IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase, format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Spinner from '../../../../commons/Spinner';
import useGetQuestions from '../../hooks/useGetQuestions';

import RelatedQuestion from './RelatedQuestion';
import styles from './styles.module.css';

const FEEDBACK_MAPPING_ISLIKED = {
	true  : 'liked',
	false : 'disliked',
};

function AnswerPage() {
	const {
		general,
	} = useSelector((state) => state);
	const router = useRouter();

	const { query } = general || {};

	const { id = '', topicId = '' } = query || {};

	const [show, setShow] = useState(false);
	const [load, setload] = useState(true);
	const { refetchQuestions, data: answerData, loading } = useGetQuestions({ id });

	const is_positive = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive;

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');

	useEffect(() => {
		setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const { handleSubmit, formState: { errors }, control } = useForm();

	const apiName = answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading: feedbackLoading }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	});

	const onClose = () => {
		setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		setShow(false);
	};

	const onClickLikeButton = async ({ _id }) => {
		setload(false);

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

			setIsLiked(isLiked === 'liked' ? '' : 'liked');
			refetchQuestions();
		} catch (error) {
			Toast.error(error?.message);
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
			refetchQuestions();
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onSubmit = async (values) => {
		setload(false);
		let remark = values?.remark;

		if (values?.answer_checkbox) {
			remark = `Answer not satisfactory. ${remark}`;
		}
		if (values?.question_checkbox) {
			remark = `Question not satisfactory. ${remark}`;
		}

		let payload = {
			faq_answer_id : answerData?.answers[0]?.id,
			is_positive   : false,
			remark,
			status        : 'active',
		};
		if (answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
			payload = {
				id            : answerData?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				faq_answer_id : answerData?.answers[0]?.id,
				is_positive   : false,
				remark,
				status        : 'active',
			};
		}

		try {
			await trigger({
				data: payload,
			});

			setIsLiked('disliked');
			setShow(false);
			refetchQuestions();
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onClickBackIcon = () => {
		const href = `/learning/faq${topicId ? `?topicId=${topicId}` : ''}`;
		router.push(href, href);
	};

	if (loading && load) {
		return (
			<div className={styles.spinner}>
				<Spinner
					borderWidth="4px"
					outerBorderColor="#FBD69F"
					spinBorderColor="red"
					width="36px"
					height="36px"
				/>
			</div>
		);
	}

	return (
		<div>
			<div
				style={{ display: 'flex' }}
				role="presentation"
				className={styles.back}
				onClick={onClickBackIcon}
			>
				<div className={styles.arrow}><IcMArrowBack /></div>
				Go Back
			</div>

			<div className={styles.questionheading}>Question</div>

			<div className={styles.questionabstract}>
				{answerData?.question_abstract}
			</div>

			<div className={styles.answer}>Answer:</div>

			<div className={styles.heading_container}>
				<div dangerouslySetInnerHTML={{ __html: answerData?.answers[0]?.answer }} />
			</div>

			<div className={styles.answer}>Tags</div>

			<div className={styles.pills}>
				{(answerData?.faq_tags || []).map((item) => (
					<Pill
						className={styles.questions_tag}
						key={item.display_name}
						size="sm"
						color="white"
					>
						{startCase(item.display_name)}
					</Pill>
				))}
			</div>

			<div className={styles.flex_items}>
				<span className={styles.subtitle}>Did you find this information helpful?</span>
				<div
					role="presentation"
					className={styles.like_container}
					onClick={() => {
						onClickLikeButton({ _id: answerData?.answers[0]?.id });
					}}
				>
					{answerData?.answers[0]?.upvote_count >= 0 ? (
						<Badge
							placement="left"
							color="green"
							size="md"
							// eslint-disable-next-line no-unsafe-optional-chaining
							text={answerData?.answers[0]?.upvote_count || 0}
						>
							<IcCLike fill={isLiked === 'liked' ? 'black' : '#f8f5ec'} />
						</Badge>
					) : (
						<IcCLike fill={isLiked === 'liked' ? 'black' : '#f8f5ec'} />
					) }
				</div>

				<div
					role="presentation"
					className={styles.dislike_container}
					onClick={() => {
						if (isLiked !== 'disliked') {
							setShow(true);
							setIsLiked('disliked');
						} else {
							onClickRemoveDisLike();
						}
					}}
				>
					<IcCDislike fill={isLiked === 'disliked' ? 'black' : '#f8f5ec'} />
				</div>

				<Modal
					size="md"
					show={show}
					onClose={onClose}
					placement="center"
				>
					<Modal.Header title="Reason for dislike" />
					<Modal.Body>
						<form
							className={styles.form_container}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<CheckboxController
									control={control}
									name="question_checkbox"
									type="checkbox"
									label="Question not satisfactory"
								/>
								<CheckboxController
									control={control}
									name="answer_checkbox"
									type="checkbox"
									label="Answer not satisfactory"
								/>
							</div>

							<div className={styles.remark}>
								<div className={styles.aftercheckbox}>Remarks</div>
								<InputController
									control={control}
									name="remark"
									type="text"
									placeholder="Enter remark here"
									rules={{ required: 'Remark is required' }}
								/>
								{errors.remark && (
									<span className={styles.errors}>
										{errors.remark.message}
									</span>
								)}
							</div>
							<div className={styles.submit_btn}>
								<Button
									type="submit"
									loading={feedbackLoading}
								>
									Submit
								</Button>
							</div>
						</form>
					</Modal.Body>
				</Modal>
			</div>

			<div className={styles.liked_wrapper}>
				{answerData?.answers[0]?.upvote_count > 0 ? (
					<span className={styles.sidetext}>
						{answerData?.answers[0]?.upvote_count}
						{' '}
						people found it useful.
					</span>
				) : null}
				{'    '}
				<span className={styles.sidetext}>
					Last updated on:
					{' '}
					{format(answerData?.updated_at, 'dd MMM yyyy')}
				</span>
			</div>

			<RelatedQuestion query_name={answerData?.query_name} question_abstract={answerData?.question_abstract} />
		</div>
	);
}

export default AnswerPage;
