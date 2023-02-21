import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListManagers = ({
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		filters: {
		},
		page       : 1,
		page_limit : 20,
	});

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list-managers',
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

export default useListManagers;
