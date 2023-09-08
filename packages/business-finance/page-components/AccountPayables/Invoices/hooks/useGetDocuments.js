import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetDocument = () => {
	const [{ data: DocumentData, loading: billsLoading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/shipment-documents',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_shipment_documents',
		},
		{ manual: true },
	);

	const onGetDocument = async (id = '', services = '') => {
		try {
			const payload = {
				id,
				service_type: services.toUpperCase(),
			};
			await trigger({
				params: payload,
			});
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		onGetDocument,
		DocumentData,
		billsLoading,
	};
};
export default useGetDocument;
