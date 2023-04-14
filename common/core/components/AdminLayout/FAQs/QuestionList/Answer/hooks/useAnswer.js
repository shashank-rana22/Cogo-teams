import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useMemo, useEffect } from 'react';

const useAnswer = ({ question, setIsLiked, FEEDBACK_MAPPING_ISLIKED }) => {
	const params = useMemo(
		() => ({
			id: question?.id,

		}),
		[question?.id],
	);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
		params,
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			const res = await trigger({
				params,
			});

			const { is_positive } = res?.data?.answers?.[0]?.faq_feedbacks?.[0] || {};
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [FEEDBACK_MAPPING_ISLIKED, params, setIsLiked, trigger]);

	useEffect(() => { fetch(); }, [fetch]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
