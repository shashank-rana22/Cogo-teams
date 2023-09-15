import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useGetJVList = ({ filters = {}, t = () => {} }) => {
	const [{ data:jvListData, loading: jvListLoading }, jvListTrigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/list',
			authKey : 'get_payments_parent_jv_list',
			method  : 'get',
		},
		{ manual: true },
	);
	const { page = '', pageLimit = '' } = filters || {};
	const jvListRefetch = async () => {
		try {
			await jvListTrigger({
				params: {
					page,
					pageLimit,
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message || t('settlement:something_went_wrong_message'));
		}
	};

	return {
		jvListData,
		jvListLoading,
		jvListRefetch,
	};
};
export default useGetJVList;
