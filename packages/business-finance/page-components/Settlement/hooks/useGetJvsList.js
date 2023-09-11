import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useGetJVList = ({ filters = {} }) => {
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
			Toast.error(error?.error?.message || 'Something went wrong');
		}
	};

	return {
		jvListData,
		jvListLoading,
		jvListRefetch,
	};
};
export default useGetJVList;
