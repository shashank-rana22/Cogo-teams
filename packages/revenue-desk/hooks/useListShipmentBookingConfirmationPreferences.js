import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListShipmentBookingConfirmationPreferences = ({ serviceData } = {}) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_shipment_booking_confirmation_preferences',
	}, { manual: true });

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters                       : { service_id: serviceData?.id },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		data:data?.list,
		loading,
	};
};
export default useListShipmentBookingConfirmationPreferences;