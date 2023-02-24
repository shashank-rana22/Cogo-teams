import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useMostReadFAQs() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const fetchMostReadFAQs = async () => {
		try {
			await trigger({
				params: { },
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchMostReadFAQs(); }, []);

	return {
		refetchMostReadFAQs: fetchMostReadFAQs,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useMostReadFAQs;
