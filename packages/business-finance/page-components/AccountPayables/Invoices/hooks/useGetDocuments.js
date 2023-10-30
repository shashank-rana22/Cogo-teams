import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../../commons/toastApiError';

const useGetDocument = () => {
	const [{ data: documentData, loading: billsLoading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/shipment-documents',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_shipment_documents',
		},
		{ manual: true },
	);

	const onGetDocument = async ({ id = '', services = '' }) => {
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
		documentData,
		billsLoading,
	};
};
export default useGetDocument;
