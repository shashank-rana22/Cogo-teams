import { Modal, Button } from '@cogoport/components';
import { useForm, InputController, CheckboxController } from '@cogoport/forms';
import { IcCDislike, IcCLike } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { React, useState } from 'react';

import useGetQuestions from '../../hooks/useGetQuestions';
import QuestionsCollapse from '../QuestionCollapse';

import styles from './styles.module.css';

function Questions({ questions }) {
	const [open, setOPen] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [id, setId] = useState(questions.id);
	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useGetQuestions({ id });
	const [show, setShow] = useState(false);
	// const contentRef = useRef();
	// if (contentRef.current) console.log(contentRef.current.scrollHeight);
	const { handleSubmit, formState: { errors }, control } = useForm();
	const [{ loading: feedbackLoading }, trigger] = useRequest({
		url    : '/create_faq_feedback',
		method : 'POST',
	});

	const onClose = () => {
		setShow(false);
		setIsLiked('');
	};

	const toggle = () => {
		setOPen(!open);
	};

	const onClickLikeButton = async () => {
		try {
			const payload = {
				faq_answer_id : '',
				is_positive   : true,
			};

			await trigger({
				data: payload,
			});

			setIsLiked(isLiked === 'liked' ? '' : 'liked');
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onSubmit = async (values) => {
		try {
			let remark = values?.remark;
			if (values?.answer_checkbox) {
				remark = `Answer not satisfactory. ${remark}`;
			}
			if (values?.question_checkbox) {
				remark = `Question not satisfactory. ${remark}`;
			}
			await trigger({
				data: {
					faq_answer_id : '',
					is_positive   : false,
					remark,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	return (
		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle}>
				<QuestionsCollapse collapse={open} questions={questions} />
			</div>
			{open && (
				<>
					<div className={styles.heading_container}>
						{startCase(data?.answers[0])}
					</div>
					<div>
						<span className={styles.sidetext}>
							{data?.view_count}
							{' '}
							people found it useful.
						</span>
						{'    '}
						<span className={styles.sidetext}>
							Last updated on:
							{' '}
							{data?.updated_at}
						</span>
					</div>
					<div className={styles.flex_items}>
						<span className={styles.subtitle}>Did you find this information helpful?</span>
						<div
							role="presentation"
							className={styles.like_container}
							onClick={() => {
								onClickLikeButton();
							}}
						>
							<IcCLike fill={isLiked === 'liked' ? 'red' : '#f8f5ec'} />

						</div>

						<div
							role="presentation"
							className={styles.dislike_container}
							onClick={() => {
								setShow(true);
								setIsLiked(
									isLiked === 'disliked' ? '' : 'disliked',
								);
							}}
						>
							<IcCDislike fill={isLiked === 'disliked' ? 'black' : '#f8f5ec'} />

						</div>

						<div>
							<Modal
								size="md"
								show={show}
								onClose={onClose}
								placement="right"
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
												placeholder="Email"
												rules={{ required: 'Remark is required' }}
											/>
											{errors.remark && (
												<span className={styles.errors}>
													{errors.remark.message}
												</span>
											)}
										</div>
										<Button type="submit" loading={feedbackLoading}>Submit</Button>
									</form>
								</Modal.Body>
							</Modal>
						</div>
					</div>
					<div>
						<span className={styles.relatedquestion}>Related Questions</span>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							When should I use EXW?
						</div>
						<div
							className={styles.subtitle}
							style={{ opacity: '0.8', marginTop: '1%' }}
						>
							What are the documents I need to procure for Incoterms?
						</div>

					</div>
				</>
			)}
		</div>
	);
}

export default Questions;
