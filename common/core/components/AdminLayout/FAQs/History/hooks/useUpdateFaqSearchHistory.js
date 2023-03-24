import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateFaqSearchHistory = ({ setShowHistory }) => {
	const { profile = {} } = useSelector((state) => state);

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
			const res = await trigger({ params });
			if (!res.hasError) {
				setShowHistory(false);
				Toast.success('History deleted successfully!');
			}
		} catch (e) {
			Toast.error(e?.messages);
		}
	};

	return { onClickClearHistory, data, loading };
};

export default useUpdateFaqSearchHistory;
