import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useCreateFaqQuestionAlias = ({
	suggested_question_abstract,
	fetchListFaqFeedback,
	feedbackId,
	fetchQuestion,
	faqAudiences,
}) => {
	const [showAliasInput, setShowAliasInput] = useState(false);
	const [inputAlias, setInputAlias] = useState(suggested_question_abstract);

	const general = useSelector((state) => state.general || {});

	const audience_ids = [];

	(faqAudiences || []).map((audience) => audience_ids.push(audience?.id));

	const { id = '' } = general?.query || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_question_alias',
		method : 'POST',
	}, { manual: true });

	const onClickAddAlias = async () => {
		const payload = {
			parent_question_id      : id,
			alias_question_abstract : inputAlias,
			faq_feedback_id         : feedbackId,
			audience_ids,

		};

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Aliases added sucessfully');
			setShowAliasInput(false);
			fetchListFaqFeedback();
			fetchQuestion();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		onClickAddAlias,
		loading,
		showAliasInput,
		setShowAliasInput,
		inputAlias,
		setInputAlias,
	};
};

export default useCreateFaqQuestionAlias;
