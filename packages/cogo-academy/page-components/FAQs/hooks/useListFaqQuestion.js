import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions(searchState = '') {
	const [activeTab, setActiveTab] = useState('');
	console.log('apisearch', searchState);
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state  : 'published',
						status : 'active',
						q      : searchState,
					},
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqQuestions(); }, [searchState]);

	return {
		refetchQuestions: fetchFaqQuestions,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqQuestions;
