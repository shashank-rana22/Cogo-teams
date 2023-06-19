import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import incoTermMapping from '../helper/incoTermMapping';

const useListRevenueDeskAvailableRates = ({ singleServiceData, shipmentData } = {}) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_available_rates',
	}, { manual: true });
	const ListRevenueAvailableRates = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id       : singleServiceData?.shipment_id,
						service_id        : singleServiceData?.id,
						service_type      : singleServiceData?.service_type?.split('_').slice(0, -1).join('_'),
						port_id           : singleServiceData?.port_id || undefined,
						is_rate_available : true,
						trade_type        : singleServiceData?.trade_type
													|| incoTermMapping[singleServiceData?.inco_term],
						airport_id              : singleServiceData?.airpot_id || undefined,
						origin_port_id          : singleServiceData?.origin_port_id || undefined,
						destination_port_id     : singleServiceData?.destination_port_id || undefined,
						// shipping_line_id        : singleServiceData?.shipping_line_id || undefined,
						container_size          : singleServiceData?.container_size,
						container_type          : singleServiceData?.container_type,
						commodity               : singleServiceData?.commodity,
						origin_airport_id       : singleServiceData?.origin_airport_id || undefined,
						destination_airport_id  : singleServiceData?.destination_airport_id || undefined,
						// airline_id              : singleServiceData?.airline_id || undefined,
						origin_location_id      : singleServiceData?.origin_location_id || undefined,
						destination_location_id : singleServiceData?.destination_location_id || undefined,
						partner_id              : user_profile?.partner_id,
						operation_type          : singleServiceData?.operation_type || undefined,
						stacking_type           : singleServiceData?.packages?.[0]?.handling_type || undefined,
						shipment_type           : singleServiceData?.packages?.[0]?.packing_type || undefined,
						cargo_handling_type     : singleServiceData?.cargo_handling_type || undefined,

					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		if (singleServiceData && !singleServiceData?.is_preference_set
			&& !['completed', 'cancelled'].includes(shipmentData?.state)) {
			ListRevenueAvailableRates();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleServiceData]);
	return {
		loading,
		data,
	};
};
export default useListRevenueDeskAvailableRates;
