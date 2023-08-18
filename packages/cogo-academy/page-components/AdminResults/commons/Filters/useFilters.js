import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useFilters = () => {
	const { query = {} } = useSelector((state) => state.general);

	const { test_id } = query || {};

	const [{ loading = false }, trigger] = useRequest({
		url    : '/download_test_results',
		method : 'get',
	}, { manual: true });

	const onClickDownloadResults = async () => {
		try {
			const res = await trigger({ params: { test_id } });

			window.open(res?.data?.uploaded_file_path, '_blank', 'noreferrer');
		} catch (error) {
			if (error?.message || error?.response?.data) Toast.error(error?.message || error?.response?.data);
		}
	};

	return {
		loading,
		onClickDownloadResults,
	};
};

export default useFilters;
