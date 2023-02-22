import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListManagers = ({
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		// filters: {
		// },
		Page      : 1,
		PageLimit : 20,
	});

	const [{ data: feedbackData = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-managers',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	// eslint-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		setParams({
			...params,
			Q    : searchValue || undefined,
			Page : 1,
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

export default useListManagers;
