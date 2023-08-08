import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

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
			toastApiError(error);
		}
	};

	return {
		refresh,
		refreshLoading,
	};
};
export default useRefreshData;
