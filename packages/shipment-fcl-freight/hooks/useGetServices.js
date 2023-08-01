import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import filterServicesForKam from '../helpers/filterServicesForKam';

const SERVICES_TO_BE_FILTERED_FOR = ['consignee_shipper_booking_agent', 'booking_agent'];

function useGetServices({ shipment_data = {}, additional_methods = [], activeStakeholder = '' }) {
	const [servicesData, setServicesData] = useState([]);
	const [bookingReqData, setBookingReqData] = useState({});

	const [{ loading : servicesLoading }, trigger] = useRequest({
		url    : 'fcl_freight/get_services',
		method : 'GET',
	}, { manual: true });

	const { id = '', end_to_end_shipment } = shipment_data || {};

	const listServices = useCallback(
		async () => {
			try {
				const res = await trigger({
					params: {
						shipment_id: id,
						additional_methods,
					},
				});

				const allServices = res.data?.summary || [];

				if (!end_to_end_shipment?.is_possible || !SERVICES_TO_BE_FILTERED_FOR.includes(activeStakeholder)) {
					setServicesData(allServices);
				} else {
					setServicesData(filterServicesForKam({ services: allServices, shipment_data }));
				}
				setBookingReqData(res?.data?.booking_requirement);
			} catch (err) {
				toastApiError(err);
			}
		},
		[trigger, id, additional_methods, end_to_end_shipment?.is_possible, activeStakeholder, shipment_data],
	);

	useEffect(() => {
		if (id) listServices();
	}, [listServices, id]);

	return {
		servicesGet: {
			servicesLoading,
			refetchServices     : listServices,
			servicesList        : servicesData,
			bookingRequirements : bookingReqData,
		},

	};
}

export default useGetServices;
