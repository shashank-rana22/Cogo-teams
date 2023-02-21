import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListUserFeedbacks = ({
	searchValue = '',
	month = '', year = '',
}) => {
	const [params, setParams] = useState({
		filters: {
			month : month || undefined,
			year  : year || undefined,
		},
		page: 1,
	});

	const [{ data: feedbackData = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, page: p }); };

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
		setPage,
	};
};

export default useListUserFeedbacks;
