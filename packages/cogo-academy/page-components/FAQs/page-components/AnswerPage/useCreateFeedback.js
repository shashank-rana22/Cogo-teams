import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const FEEDBACK_MAPPING_ISLIKED = {
	true  : 'liked',
	false : 'disliked',
};

const useCreateFeedback = ({ refetchQuestions, answerData, loading }) => {
	const [show, setShow] = useState(false);
	const [load, setload] = useState(true);

	const { is_positive, id } = answerData?.answers?.[0]?.faq_feedbacks?.[0] || {};

	const [isLiked, setIsLiked] = useState(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');

	useEffect(() => {
		if (!loading) {
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive]);
		}
	}, [is_positive, loading]);

	const { handleSubmit, formState: { errors }, control, watch } = useForm();

	const watchQuestionCheckbox = watch('question_checkbox');
	const watchAnswerCheckbox = watch('answer_checkbox');
	const watchRemark = watch('remark');

	const apiName = id
		? '/update_faq_feedback'
		: '/create_faq_feedback';

	const [{ loading: feedbackLoading = false }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	});

	const onClose = () => {
		setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		setShow(false);
	};

	const onClickLikeButton = async ({ _id }) => {
		setload(false);
		setIsLiked(isLiked === 'liked' ? '' : 'liked');

		try {
			let payload = {
				faq_answer_id : _id,
				is_positive   : true,
				status        : 'active',
			};
			if (isLiked === 'liked') {
				payload = {
					id,
					status: 'inactive',
				};
			} else if (isLiked === 'disliked') {
				payload = {
					id,
					is_positive : true,
					status      : 'active',
				};
			}

			await trigger({
				data: payload,
			});

			refetchQuestions();
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
					id,
					status: 'inactive',
				},
			});

			refetchQuestions();
		} catch (error) {
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	const onSubmit = async (values) => {
		setload(false);
		setIsLiked('disliked');

		let remark = values?.remark ? values.remark : '';


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
			suggested_answer            : watchAnswerCheckbox ? values?.answer : undefined,
		};
		if (answerData?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
			payload = {
				id,
				faq_answer_id               : answerData?.answers[0]?.id,
				is_positive                 : false,
				remark,
				status                      : 'active',
				suggested_question_abstract : watchQuestionCheckbox ? values?.question : undefined,
				suggested_answer            : watchAnswerCheckbox ? values?.answer : undefined,
			};
		}

		try {
			await trigger({
				data: payload,
			});

			setShow(false);
			refetchQuestions();
		} catch (error) {
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	return {
		show,
		setShow,
		load,
		setload,
		handleSubmit,
		errors,
		control,
		feedbackLoading,
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

	};
};

export default useCreateFeedback;
