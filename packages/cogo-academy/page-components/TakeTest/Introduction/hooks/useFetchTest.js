import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useFetchTest = () => {
	const {
		profile: { user: { id:user_id = '' } },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test',
	}, { manual: true });

	const id = '2b605b28-3cc1-47a7-b73e-52b8a2cb9f76';
	const fetchTest = () => {
		try {
			const payload = {
				id,
			};
			trigger({
				params: payload,
			});
		} catch (err) {
			console.log('error', err);
		}
	};

	useEffect(() => {
		fetchTest();
	}, []);

	return {
		loading,
		data,
		fetchTest,
	};
};

export default useFetchTest;
