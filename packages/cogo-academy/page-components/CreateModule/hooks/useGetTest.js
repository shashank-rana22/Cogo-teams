import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetTest() {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_test',
	}, { manual: true });

	const getTest = async ({ test_id }) => {
		try {
			const res = await trigger({
				params: {
					id: test_id,
				},
			});
			console.log('data:: ', res.data);
			setData(res?.data);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading,
		data,
		getTest,
	};
}

export default useGetTest;
