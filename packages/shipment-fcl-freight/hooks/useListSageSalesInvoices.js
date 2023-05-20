import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

const useListSageSalesInvoices = () => {
	const router = useRouter();
	const { shipment_id } = router?.query || {};
	const [
		{ loading, data },
		trigger,
	] = useRequest(
		{
			url    : '/list_sage_invoices_v2',
			method : 'GET',
		},
		{ autoCancel: false },
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					page_limit : 50,
					filters    : { invoice_type: 'income', entity_id: shipment_id },
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [shipment_id, trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return { loading, list: data?.list || [] };
};

export default useListSageSalesInvoices;
