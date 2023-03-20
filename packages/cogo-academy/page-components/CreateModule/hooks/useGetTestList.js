import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetTestList() {
	const [{ loading = false, data = {} }, trigger] = useRequest({
		url    : 'list_tests',
		method : 'GET',
	}, { manual: true });

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
		},
	});

	const fetchList = () => {
		try {
			trigger({
				params,
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	return {
		data,
		loading,
		fetchList,
		params,
		setParams,
	};
}

export default useGetTestList;
