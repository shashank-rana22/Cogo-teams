import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useGetUserList() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'get_test_sheet',
	}, { manual: true });

	const getUserList = (test_sheet_id) => {
		try {
			trigger({
				params: {
					id: test_sheet_id,
				},
			});
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	return {
		loading,
		data,
		getUserList,
	};
}

export default useGetUserList;
