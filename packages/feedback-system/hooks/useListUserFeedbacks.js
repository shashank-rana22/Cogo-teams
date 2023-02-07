import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListUserFeedbacks = ({
	userId = '',
	key = '',
	searchValue = '',
	params = {},
}) => {
	const [pagination, setPagination] = useState(1);

	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list_user_feedbacks',
	}, { manual: true });

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
								created_at_greater_than : firstDay,
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

	useEffect(() => {
		getUserFeedbackList();
	}, [pagination, searchValue, params]);

	return {
		feedbackData,
		loading,
		pagination,
		setPagination,
		getUserFeedbackList,
	};
};

export default useListUserFeedbacks;
