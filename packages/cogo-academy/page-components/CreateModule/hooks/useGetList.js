import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetList({ activeTab }) {
	const [{ loading = false }, trigger] = useRequest({
		url    : `list_${activeTab}`,
		method : 'GET',
	}, { manual: true });

	const [listData, setListData] = useState('');
	const [params, setParams] = useState({
		page: 1,
	});

	const fetchList = async () => {
		try {
			const res = await trigger({
				params: {
					...params,
				},

			});
			setListData(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, activeTab]);

	return {
		data: listData || {},
		loading,
		fetchList,
		setParams,
	};
}

export default useGetList;
