import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

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
			toastApiError(error);
		}
	};

	return {
		deleteId,
		deleteIdLoading,
	};
};
export default useDeleteData;
