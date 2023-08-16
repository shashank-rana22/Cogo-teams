import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 10;
const NEXT_PAGE_COUNT = 1;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_NO_OF_AGENTS = 0;
const MIN_HEIGHT_FOR_API_CALL = 3;

const getParams = ({ page }) => ({
	page,
	sort_by                   : 'escalations',
	escalation_stats_required : true,
});

const useListEscalationChat = () => {
	const [listData, setListData] = useState({ list: [], isLastPage: false });
	const [pagination, setPagination] = useState(DEFAULT_PAGE_NUMBER);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_chat_agents',
		method : 'get',
	}, { manual: true });

	const chatAgent = useCallback(async ({ page }) => {
		try {
			const res = await trigger({
				params: getParams({ page }),
			});

			setPagination(page);

			if (res.data) {
				const { list = [] } = res.data || {};
				const isLastPage = (list.length || DEFAULT_NO_OF_AGENTS) < PAGE_LIMIT;

				setListData((prev) => ({
					list: [...(prev?.list || []), ...(list || [])],
					isLastPage,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	const handleScroll = (e) => {
		const { clientHeight, scrollTop, scrollHeight } = e.target;

		const reachBottom = scrollTop + clientHeight + MIN_HEIGHT_FOR_API_CALL >= scrollHeight;

		if (reachBottom && !loading && !listData?.isLastPage) {
			chatAgent({ page: pagination + NEXT_PAGE_COUNT });
		}
	};

	useEffect(() => {
		setListData({ list: [], isLastPage: false });
		chatAgent({ page: DEFAULT_PAGE_NUMBER });
	}, [chatAgent]);

	return {
		listData,
		loading,
		handleScroll,
	};
};

export default useListEscalationChat;
