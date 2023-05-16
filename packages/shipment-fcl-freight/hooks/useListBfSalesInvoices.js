import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListBfSalesInvoices = (shipment_data) => {
	const [
		{ loading: apiLoading, data },
		trigger,
	] = useRequestBf(
		{
			url     : '/sales/invoice/shipment/list',
			method  : 'get',
			authKey : 'get_sales_invoice_shipment_list',
		},
		{ autoCancel: false },
	);

	const listApi = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						jobNumber : shipment_data?.serial_id || undefined,
						jobSource : 'LOGISTICS',
						jobType   : 'SHIPMENT',
						pageSize  : 50,
						page      : 1,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [shipment_data?.serial_id, trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return {
		salesList    : data?.list || [],
		salesLoading : apiLoading,
		refetch      : listApi,
	};
};

export default useListBfSalesInvoices;
