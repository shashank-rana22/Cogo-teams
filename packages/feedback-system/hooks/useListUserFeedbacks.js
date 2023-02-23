import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListUserFeedbacks = ({
	searchValue = '',
	month = '', year = '',
	userId = '',
	managerId = '',
}) => {
	const [params, setParams] = useState({
		ManagerID : managerId || undefined,
		UserID    : userId || undefined,
		Month     : month || undefined,
		Year      : year || undefined,
		Page      : 1,
		PageLimit : 10,
	});

	const [{ data: feedbackData = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams({
			...params,
			Page : 1,
			Q    : searchValue || undefined,
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
