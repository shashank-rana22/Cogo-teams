import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqTopic() {
	const [activeTab, setActiveTab] = useState('All Topics');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'faq/list_faq_topics',
	}, { manual: true });

	const fetchFaqTopic = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTopic(); }, []);

	return {
		refetchTopic: fetchFaqTopic,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqTopic;
