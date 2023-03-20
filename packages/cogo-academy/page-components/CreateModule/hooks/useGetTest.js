import { useRequest } from '@cogoport/request';

function useGetTest() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'get_test',
	}, { manual: true });

	const getTest = ({ test_id }) => {
		try {
			trigger({
				params: {
					id: test_id,
				},
			});
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
