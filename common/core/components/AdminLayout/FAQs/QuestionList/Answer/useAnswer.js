import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useAnswer = ({ question }) => {
	// eslint-disable-next-line no-unused-vars
	const scope = useSelector(({ general }) => general?.scope);

	const [{ data, loading }, trigger] = useRequest({
		url    : 'get_question',
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
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
