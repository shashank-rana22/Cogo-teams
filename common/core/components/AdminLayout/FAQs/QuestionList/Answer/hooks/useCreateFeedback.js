import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useAnswer from './useAnswer';

const FEEDBACK_MAPPING_ISLIKED = {
	true  : 'liked',
	false : 'disliked',
};

const useCreateFeedback = ({ question }) => {
	const {
		profile: { partner = '' },
	} = useSelector((state) => state);

	const { handleSubmit, control, watch } = useForm();

	const watchQuestionCheckbox = watch('question_checkbox');
	const watchAnswerCheckbox = watch('answer_checkbox');

	const [show, setShow] = useState(false);
	const [load, setload] = useState(true);

	const { data: answerData, loading, fetch } = useAnswer({ question });

	const { id, is_positive } = answerData?.answers?.[0]?.faq_feedbacks?.[0] || {};

	const isFeedbackLiked = FEEDBACK_MAPPING_ISLIKED[is_positive] || '';

	const [isLiked, setIsLiked] = useState(isFeedbackLiked);

	const apiName = id ? '/update_faq_feedback' : '/create_faq_feedback';

	const [{ loading : feedbackLoading }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	}, { manual: true });

	const onClickLikeButton = async ({ answerId }) => {
		setload(false);
		setIsLiked(isFeedbackLiked === 'liked' ? '' : 'liked');
		setShow(false);
		try {
			let payload = {
				faq_answer_id : answerId,
				is_positive   : true,
				status        : 'active',
			};
			if (isFeedbackLiked === 'liked') {
				payload = {
					id,
					status: 'inactive',
				};
			} else if (isFeedbackLiked === 'disliked') {
				payload = {
					id,
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
					id,
					status: 'inactive',
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
			suggested_answer            : watchAnswerCheckbox ? values?.answer : undefined,
		};
		if (is_positive) {
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
			fetch();
		} catch (error) {
			Toast.error(error?.message);
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	return {
		handleSubmit,
		control,
		show,
		load,
		loading,
		feedbackLoading,
		onClickLikeButton,
		onClickRemoveDisLike,
		onSubmit,
		goToFAQ,
		answerData,
		isLiked,
		setShow,
		setIsLiked,
		watchAnswerCheckbox,
		watchQuestionCheckbox,
		is_positive,
		FEEDBACK_MAPPING_ISLIKED,

	};
};

export default useCreateFeedback;
