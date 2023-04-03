import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useGetTest() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : '/get_test',
	}, { manual: true });

	const getTest = ({ test_id }) => {
		try {
			trigger({
				params: {
					id: test_id,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return {
		loading,
		data,
		getTest,
	};
}

export default useGetTest;
