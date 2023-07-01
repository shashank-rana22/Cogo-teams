import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useAnswer from './useAnswer';

const FEEDBACK_MAPPING_ISLIKED = {
	true  : 'liked',
	false : 'disliked',
};

const useCreateFeedback = ({ question }) => {
	const { partner = '' }	 = useSelector((state) => state?.profile || {});
	const [show, setShow] = useState(false);
	const [load, setload] = useState(true);
	const [isLiked, setIsLiked] = useState();

	const { handleSubmit, control, watch, formState: { errors } } = useForm();

	const watchQuestionCheckbox = watch('question_checkbox');
	const watchAnswerCheckbox = watch('answer_checkbox');
	const watchRemark = watch('remark');

	const { data: answerData, loading, fetch } = useAnswer({ question, setIsLiked, FEEDBACK_MAPPING_ISLIKED });

	const { id, is_positive } = answerData?.answers?.[0]?.faq_feedbacks?.[0] || {};

	const apiName = id ? '/update_faq_feedback' : '/create_faq_feedback';

	const [{ loading : feedbackLoading }, trigger] = useRequest({
		url    : apiName,
		method : 'POST',
	}, { manual: true });

	const onClickLikeButton = async ({ answerId }) => {
		setload(false);
		setIsLiked(isLiked === 'liked' ? '' : 'liked');
		setShow(false);
		try {
			let payload = {
				faq_answer_id : answerId,
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

			fetch();
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }

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
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }

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
		if (is_positive) {
			payload = {
				...payload,
				id,
			};
		}

		try {
			await trigger({
				data: payload,
			});

			setShow(false);
			fetch();
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }

			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		}
	};

	return {
		handleSubmit,
		control,
		show,
		load,
		loading,
		errors,
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
		watchRemark,
		is_positive,
		FEEDBACK_MAPPING_ISLIKED,

	};
};

export default useCreateFeedback;
