import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetQuestions({ id }) {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'faq/get_question',
	}, { manual: true });

	const fetchQuestions = async () => {
		try {
			await trigger({
				params: { id },
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetchQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		refetchQuestions: fetchQuestions,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useGetQuestions;
