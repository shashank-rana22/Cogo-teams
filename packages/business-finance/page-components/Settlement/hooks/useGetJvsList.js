import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useGetJVList = ({ filters }) => {
	const [{ data:JvListData, loading: JvListLoading }, JvListTrigger] = useRequestBf(
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
			await JvListTrigger({
				params: {
					page,
					pageLimit,
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message);
		}
	};

	return {
		JvListData,
		JvListLoading,
		jvListRefetch,
	};
};
export default useGetJVList;
