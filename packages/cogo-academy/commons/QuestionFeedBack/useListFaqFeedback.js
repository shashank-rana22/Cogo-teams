import { Toast } from '@cogoport/components';
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
		page_limit           : 5,
		author_data_required : true,
	}), [id, page]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_faq_feedbacks',
	}, { manual: true });

	const fetchListFaqFeedback = useCallback(() => {
		try {
			trigger({ params });
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [params, trigger]);

	useEffect(() => {
		if (id) {
			fetchListFaqFeedback();
		}
	}, [fetchListFaqFeedback, id]);

	const { list, total_count, page_limit } = data || {};

	return {
		list,
		loading,
		page,
		setPage,
		total_count,
		page_limit,
	};
};

export default useListfaqFeedback;
