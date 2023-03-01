import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetVoiceCallList = () => {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [pagination, setPagination] = useState(1);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = async () => {
		try {
			const res = await trigger({
				params: { page: pagination, source: 'omnichannel' },
			});
			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			// console.log(error);
		}
	};

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};
	useEffect(() => {
		voiceCallList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	return {
		loading,
		data: listData,
		handleScroll,
	};
};
export default useGetVoiceCallList;
