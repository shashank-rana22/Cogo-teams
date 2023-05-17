import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

const useListBfSalesInvoices = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

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
