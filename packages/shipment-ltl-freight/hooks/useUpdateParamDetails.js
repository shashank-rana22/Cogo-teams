import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateParamDetails = (shipmentNumber, closeModal = () => {}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_ltl_shipment_booking_parameter',
		method : 'POST',
	}, { manual: true });

	const createParamDetails = async ({ values }) => {
		const packages = (values.packages || []).map((item) => ({
			packing_type   : item?.package_type || item?.packing_type,
			packages_count : +(item?.packages_count || 0),
			package_weight : +(item?.package_weight || 0),
			length         : +(item?.length || 0) || +(item?.dimensions?.length || 0),
			width          : +(item?.width || 0) || +(item?.dimensions?.width || 0),
			height         : +(item?.height || 0) || +(item?.dimensions?.height || 0),
		}));

		const payload = { shipment_id: shipmentNumber, packages };

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Package Details added Successfully');
			closeModal();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createParamDetails,
		loading,
	};
};

export default useUpdateParamDetails;
