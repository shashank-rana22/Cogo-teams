import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetFaqFeedback = ({ feedbackId, page }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_faq_feedback',
	}, { manual: true });

	const fetchFaqFeedback = useCallback(() => {
		try {
			trigger({ params: { id: feedbackId } });
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	}, [feedbackId, trigger]);

	useEffect(() => {
		if (feedbackId && page === 1) {
			fetchFaqFeedback();
		}
	}, [feedbackId, fetchFaqFeedback, page]);

	return { data, getApiLoading: loading };
};

export default useGetFaqFeedback;
