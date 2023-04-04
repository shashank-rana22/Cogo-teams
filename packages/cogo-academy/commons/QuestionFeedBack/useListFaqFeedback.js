import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useMemo, useCallback, useEffect } from 'react';

const useListfaqFeedback = ({ id }) => {
	const params = useMemo(() => ({
		filters: {
			faq_question_id : id,
			status          : 'active',
		},
		author_data_required: true,
	}), [id]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_faq_feedbacks',
	}, { manual: true });

	const fetchListFaqFeedback = useCallback(() => {
		try {
			trigger(params);
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [params, trigger]);

	useEffect(() => {
		if (id) {
			fetchListFaqFeedback();
		}
	}, [fetchListFaqFeedback, id]);

	const { list } = data || {};

	return {
		list,
		loading,
	};
};

export default useListfaqFeedback;
