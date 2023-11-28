import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentAirCsrSheet = ({ sheetId = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_air_csr_sheet',
		method : 'POST',
	}, { manual: true });

	const updateShipmentAirCsrSheet = async (status) => {
		try {
			await trigger({
				params: {
					status,
					id: sheetId,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		updateShipmentAirCsrSheet,
	};
};
export default useUpdateShipmentAirCsrSheet;
