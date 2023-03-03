import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetFaqsAnswers({ id }) {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'faq/get_faq_answer',
	}, { manual: true });

	const fetchFaqAnswers = async () => {
		try {
			await trigger({
				params: { id },
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetchFaqAnswers();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		refetchAnswers: fetchFaqAnswers,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useGetFaqsAnswers;
