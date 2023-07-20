import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

const useListBfSalesInvoices = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [
		{ loading: apiLoading, data },
		trigger,
	] = useRequest(
		{
			url    : '/sales/invoice/shipment/list',
			method : 'GET',
		},
		{ autoCancel: false },
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					jobNumber : shipment_data?.serial_id || undefined,
					jobSource : 'LOGISTICS',
					jobType   : 'SHIPMENT',
					pageSize  : 10,
					page      : 1,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
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
