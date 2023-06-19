import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useDeleteData = ({ refetch }) => {
	const [{ loading:deleteIdLoading }, trigger] = useRequestBf(
		{
			url     : '/sales/outward',
			method  : 'delete',
			authKey : 'delete_sales_outward',
		},
		{ manual: true },
	);
	const deleteId = async (id) => {
		try {
			await trigger({
				params: {
					id,
				},
			});
			refetch();
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};

	return {
		deleteId,
		deleteIdLoading,
	};
};
export default useDeleteData;
