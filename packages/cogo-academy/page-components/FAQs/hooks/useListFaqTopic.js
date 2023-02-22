import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqTopic() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'faq/list_faq_topics',
	}, { manual: true });

	const fetchFaqTopic = async () => {
		try {
			await trigger({
				params: { },
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	console.log('data :: ', data);

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
