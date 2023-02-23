import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqQuestions() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: { },
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqQuestions(); }, []);

	return {
		refetchQuestions: fetchFaqQuestions,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqQuestions;
