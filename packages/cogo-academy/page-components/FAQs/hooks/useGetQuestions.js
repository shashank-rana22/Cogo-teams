import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetQuestions({ id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_question',
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
	};
}

export default useGetQuestions;
