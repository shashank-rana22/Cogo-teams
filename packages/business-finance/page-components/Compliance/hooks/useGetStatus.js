import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useGetStatus = ({ refetch }) => {
	const [{ loading:statusIdLoading }, trigger] = useRequestBf(
		{
			url     : '/sales/outward/operation-status',
			method  : 'get',
			authKey : 'get_sales_outward_operation_status',
		},
		{ manual: true },
	);

	const statusId = async (id) => {
		try {
			const resp = await trigger({
				params: {
					outwardId: id,
				},
			});

			Toast.success(resp?.data);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		statusId,
		statusIdLoading,
	};
};
export default useGetStatus;
