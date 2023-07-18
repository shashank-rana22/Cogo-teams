import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useValidateEwayBillNumber = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_eway_bill_details',
		method : 'GET',
	}, { manual: true });

	const updateEwayBillNumber = async (ewbNumber = '') => {
		const payload = {
			ewb_no: ewbNumber,
		};

		Toast.success(
			'Please wait, we are fetching data.... This might take some time',
		);
		try {
			const res = await trigger({
				params: payload,
			});
			if (!res?.data?.data?.data?.ewb?.ewayBillDate) {
				Toast.success('Please fill the details manually');
			}
			return res;
		} catch (e) {
			toastApiError(e?.data);
			return null;
		}
	};

	return {
		loading,
		data: data || {},
		updateEwayBillNumber,
	};
};

export default useValidateEwayBillNumber;
