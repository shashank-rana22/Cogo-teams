import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useAnswer = ({ question }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
	}, { manual: true });

	const fetch = async () => {
		try {
			await trigger({
				params: {
					id: question?.id,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data    : data || {},
		loading : loading || false,
		fetch,
	};
};

export default useAnswer;
