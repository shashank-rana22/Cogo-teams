import { useRequest } from '@cogoport/request';
import { useMemo } from 'react';

const useListfaqFeedback = ({ id }) => {
	const params = useMemo(() => ({
		filters: {
			faq_question_id : id,
			status          : 'active',
		},
		author_data_required: true,
	}), [id]);

	const [{ loading, data }] = useRequest({
		method : 'GET',
		url    : '/list_faq_feedbacks',
		params,
	}, { manual: false });

	const { list } = data || {};

	return {
		list,
		loading,
	};
};

export default useListfaqFeedback;
