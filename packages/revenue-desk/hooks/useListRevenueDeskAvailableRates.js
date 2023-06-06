import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import incoTermMapping from '../helper/incoTermMapping';

const useListRevenueDeskAvailableRates = ({ singleServiceData } = {}) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_available_rates',
	}, { manual: false });
	const ListRevenueAvailableRates = async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id  : '4b9f2240-d934-4b0f-9f6f-d5ad578b4dcb' || singleServiceData?.shipment_id,
						service_id   : singleServiceData?.id,
						service_type : 'fcl_freight'
						|| singleServiceData?.service_type?.split('_').slice(0, -1).join('_'),
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

					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		if (singleServiceData) {
			ListRevenueAvailableRates();
		}
	}, [singleServiceData]);
	return {
		loading,
		data,
	};
};
export default useListRevenueDeskAvailableRates;
