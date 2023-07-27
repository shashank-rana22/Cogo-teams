import { Modal, Button, Badge, Pill } from '@cogoport/components';
import { IcCLike, IcCDislike, IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase, format } from '@cogoport/utils';

import FeedbackForm from '../../../../commons/FeedbackForm';
import Spinner from '../../../../commons/Spinner';
import useGetQuestions from '../../hooks/useGetQuestions';

import RelatedQuestion from './RelatedQuestion';
import styles from './styles.module.css';
import useCreateFeedback from './useCreateFeedback';

const INDEX = 0;
const NULL_VALUE = 0;
const EMPTY_VALUE = 1;
function AnswerPage() {
	const {
		general,
	} = useSelector((state) => state);
	const router = useRouter();

	const { query } = general || {};

	const { id = '', topicId = '' } = query || {};

	const { refetchQuestions, data: answerData, loading } = useGetQuestions({ id });
	const {
		show,
		setShow,
		load,
		handleSubmit,
		errors,
		control,
		feedbackLoading = false,
		onClose,
		onClickLikeButton,
		onClickRemoveDisLike,
		onSubmit,
		isLiked,
		setIsLiked,
		watchQuestionCheckbox,
		watchAnswerCheckbox,
		watchRemark,
		is_positive,
		FEEDBACK_MAPPING_ISLIKED,
	} = useCreateFeedback({ refetchQuestions, answerData, loading });

	const onClickBackIcon = () => {
		const showTopicId = topicId ? `?topicId=${topicId}` : '';
		const href = `/learning/faq${showTopicId}`;
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

			<div className={styles.view_count}>
				{' '}
				{answerData?.view_count}
				{' '}
				people viewed this question

			</div>

			<div className={styles.answer}>Answer :</div>

			<div className={styles.heading_container}>
				<div dangerouslySetInnerHTML={{ __html: answerData?.answers[INDEX]?.answer }} />
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
						<div className={styles.pills_text}>
							{startCase(item.display_name)}
						</div>
					</Pill>
				))}
			</div>

			<div className={styles.flex_items}>
				<span className={styles.subtitle}>Did you find this information helpful?</span>
				<div
					role="presentation"
					className={styles.like_container}
					onClick={() => {
						onClickLikeButton({ _id: answerData?.answers[INDEX]?.id });
					}}
				>
					{answerData?.answers[INDEX]?.upvote_count >= NULL_VALUE ? (
						<Badge
							placement="left"
							color="green"
							size="md"
							text={answerData?.answers?.[INDEX]?.upvote_count || NULL_VALUE}
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
					size="lg"
					show={show}
					onClose={onClose}
					placement="center"
				>
					<Modal.Header title="Give us your feedback" />
					<Modal.Body>
						<FeedbackForm
							answerData={answerData}
							control={control}
							errors={errors}
							watchQuestionCheckbox={watchQuestionCheckbox}
							watchAnswerCheckbox={watchAnswerCheckbox}
						/>
					</Modal.Body>
					<Modal.Footer>
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
					</Modal.Footer>
				</Modal>
			</div>

			<div className={styles.liked_wrapper}>
				{answerData?.answers[NULL_VALUE]?.upvote_count > NULL_VALUE ? (
					<span className={styles.sidetext}>
						{answerData?.answers[INDEX]?.upvote_count}
						{' '}
						{answerData?.answers[INDEX]?.upvote_count === EMPTY_VALUE ? 'person' : 'people'}
						{' '}
						found it useful.
					</span>
				) : null}
				{'    '}
				<span className={styles.sidetext}>
					Last updated on:
					{' '}
					{format(answerData?.updated_at, 'dd MMM yyyy')}
				</span>
			</div>

			<div className={styles.line} />

			<RelatedQuestion query_name={answerData?.query_name} question_abstract={answerData?.question_abstract} />
		</div>
	);
}

export default AnswerPage;
