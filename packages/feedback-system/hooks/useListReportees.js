import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListReportees = ({
	userId = '',
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		ManagerID : userId || undefined,
		Page      : 1,
		PageLimit : 20,
	});

	const [{ data: feedbackData = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list-reportees',
		params,
	}, { manual: false });

	const fetchReportees = async () => {
		await trigger({ params });
	};
	const setPage = (p) => { setParams({ ...params, Page: p }); };

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
		fetchReportees,
	};
};

export default useListReportees;
