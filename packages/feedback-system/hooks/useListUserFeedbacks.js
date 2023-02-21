import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const getFirstDay = () => {
	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	return firstDay;
};

const useListUserFeedbacks = ({
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		filters: {
		},

		page: 1,
	});

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
	}, { manual: true });

	const getUserFeedbackList = () => {
		try {
			trigger({ params });
		} catch (e) {
			console.log(e.toString());
		}
	};

	const setPage = (p) => { setParams({ ...params, page: p }); };

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { getUserFeedbackList(); }, [params]);

	useEffect(() => {
		setParams({
			...params,
			filters:
		{ ...(params.filters || {}), q: searchValue || undefined },
			page: 1,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
