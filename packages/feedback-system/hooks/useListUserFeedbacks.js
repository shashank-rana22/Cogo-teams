import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const getFirstDay = () => {
	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	return firstDay;
};

const useListUserFeedbacks = ({
	userId = '',
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		// team_data_required: userId ? true : undefined,

		team_data_required: true,

		filters: {
			performed_by_id         : userId || undefined,
			created_at_greater_than : userId ? getFirstDay().toLocaleDateString() : undefined,
			// rating_exists           : true,
		},

		page: 1,
	});

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_user_feedbacks',
	}, { manual: true });

	const getUserFeedbackList = () => {
		try {
			trigger({ params });
		} catch (e) {
			console.log(e.toString());
		}
	};

	const setPage = (p) => { setParams({ ...params, page: p }); };

	useEffect(() => { getUserFeedbackList(); }, [params]);

	useEffect(() => {
		setParams({
			...params,
			filters:
		{ ...(params.filters || {}), q: searchValue || undefined },
			page: 1,
		});
	}, [searchValue]);

	return {
		params,
		setParams,
		feedbackData,
		loading,
		getUserFeedbackList,
		setPage,
	};
};

export default useListUserFeedbacks;
