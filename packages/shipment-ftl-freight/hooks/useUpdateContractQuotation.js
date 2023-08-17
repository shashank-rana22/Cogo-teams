import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateContractQuotation = ({
	shipment_id,
	refetch = () => {},
	setShow = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_contract_quotation',
		method : 'POST',
	});

	const updateContractQuotation = async () => {
		try {
			await trigger({
				data: { shipment_id },
			});
			Toast.success('Contract refetched successfully');
			refetch();
			setShow(false);
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		data,
		updateContractQuotation,
	};
};

export default useUpdateContractQuotation;
