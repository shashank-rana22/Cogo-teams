import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useRefreshData = () => {
	const [{ loading:refreshLoading }, trigger] = useRequestBf(
		{
			url     : '/sales/outward/refresh-excel-sheet',
			method  : 'put',
			authKey : 'put_sales_outward_refresh_excel_sheet',
		},
		{ manual: true },
	);
	const refresh = async (id) => {
		try {
			await trigger({
				data: {
					outwardId: id,
				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};

	return {
		refresh,
		refreshLoading,
	};
};
export default useRefreshData;
