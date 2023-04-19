import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateFaqSearchHistory = ({ setShowHistory }) => {
	const profile = useSelector((state) => state.profile || {});

	const { id = '' } = profile?.user || {};

	const params = {
		user_id    : id,
		is_cleared : true,
	};

	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/update_faq_search_history',
	}, { manual: true });

	const onClickClearHistory = async () => {
		try {
			await trigger({ params });

			setShowHistory(false);
			Toast.success('History deleted successfully!');
		} catch (err) {
			if (err.response?.data) { Toast.error(getApiErrorString(err.response?.data)); }
		}
	};

	return { onClickClearHistory, data, loading };
};

export default useUpdateFaqSearchHistory;
