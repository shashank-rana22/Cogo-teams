import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useMemo, useCallback, useEffect, useState } from 'react';

const useListfaqFeedback = ({ id }) => {
	const [page, setPage] = useState(1);

	const params = useMemo(() => ({
		filters: {
			faq_question_id : id,
			status          : 'active',
		},
		page,
		feedback_remark_stats_required : true,
		page_limit                     : 100000,
		author_data_required           : true,
	}), [id, page]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_faq_feedbacks',
	}, { manual: true });

	const fetchListFaqFeedback = useCallback(() => {
		try {
			trigger({ params });
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	}, [params, trigger]);

	useEffect(() => {
		if (id) {
			fetchListFaqFeedback();
		}
	}, [fetchListFaqFeedback, id]);

	const {
		list,
		total_count,
		page_limit,
		answer_remark,
		question_answer_remark,
		question_remark,
	} = data || {};

	return {
		list,
		loading,
		page,
		setPage,
		total_count,
		page_limit,
		answer_remark,
		question_answer_remark,
		question_remark,
	};
};

export default useListfaqFeedback;
