import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListUserFeedbacks = ({
	userId = '',
	key = '',
	searchValue = '',

}) => {
	const [pagination, setPagination] = useState(1);
	const [params, setParams] = useState({ filters: {}, page: 1 });

	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_user_feedbacks',
	}, { manual: false });

	const getUserFeedbackList = () => {
		try {
			trigger({
				params: {
					...params,
					filters: {
						...(params.filters),
						...(key === 'users_under_manager'
							? {
								performed_by_id         : userId,
								created_at_greater_than : firstDay.toDateString(),
							}
							: { rating_exists: true }),

						q: searchValue || undefined,
					},
					page: pagination,
				},
			});
		} catch (e) {
			console.log(e.toString());
		}
	};
	useEffect(() => getUserFeedbackList(), [params, searchValue, pagination]);

	return {
		params,
		setParams,
		feedbackData,
		loading,
		pagination,
		setPagination,
		getUserFeedbackList,
	};
};

export default useListUserFeedbacks;
