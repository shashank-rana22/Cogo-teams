import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useGetTestSheet() {
	const [{ loading, data = {} }, trigger] = useRequest({
		method : 'get',
		url    : 'get_test_sheet',
	}, { manual: true });

	const getTestSheet = (test_sheet_id) => {
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
		getTestSheet,
	};
}

export default useGetTestSheet;
