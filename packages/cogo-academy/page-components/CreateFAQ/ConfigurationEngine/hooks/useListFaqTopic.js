import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListFaqTopics({ status = 'active' }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: false });

	const fetchListFaqTopic = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status,
					},

				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	const listTopics = data?.list?.[0] || {};

	useEffect(() => {
		fetchListFaqTopic();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	return {
		fetchListFaqTopic,
		loading,
		listTopics,
	};
}

export default useListFaqTopics;
