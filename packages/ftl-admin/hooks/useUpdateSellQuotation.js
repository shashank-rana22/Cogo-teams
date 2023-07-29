import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateSellQuotation() {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_sell_quotations',
		method : 'POST',
	}, { manual: true });

	const udpateSellQuotation = async (quotations = {}, callback = () => {}) => {
		try {
			await trigger({
				data: quotations,
			});
			callback();
			Toast.success('Rate/Quantity Updated Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		udpateSellQuotationLoading: loading,
		udpateSellQuotation,
	};
}

export default useUpdateSellQuotation;
