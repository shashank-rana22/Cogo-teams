import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

import incoTermMapping from '../helpers/incoTermMapping';
import { DEFAULT_INDEX } from '../page-components/constants';

const useListRevenueDeskAvailableRates = ({ singleServiceData, shipmentData, isPreferenceSet } = {}) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_showed_rates',
	}, { manual: true });

	const packages = singleServiceData?.packages?.[DEFAULT_INDEX];

	const listRevenueAvailableRates = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						port_id           : singleServiceData?.port_id || undefined,
						is_rate_available : true,
						trade_type        : singleServiceData?.trade_type
														|| incoTermMapping[singleServiceData?.inco_term],
						airport_id               : singleServiceData?.airpot_id || undefined,
						origin_port_id           : singleServiceData?.origin_port_id || undefined,
						destination_port_id      : singleServiceData?.destination_port_id || undefined,
						container_size           : singleServiceData?.container_size,
						container_type           : singleServiceData?.container_type,
						commodity                : singleServiceData?.commodity,
						origin_airport_id        : singleServiceData?.origin_airport_id || undefined,
						destination_airport_id   : singleServiceData?.destination_airport_id || undefined,
						origin_location_id       : singleServiceData?.origin_location_id || undefined,
						destination_location_id  : singleServiceData?.destination_location_id || undefined,
						partner_id               : user_profile?.partner_id,
						operation_type           : singleServiceData?.operation_type || undefined,
						stacking_type            : packages?.handling_type || undefined,
						shipment_type            : packages?.packing_type || undefined,
						cargo_handling_type      : singleServiceData?.cargo_handling_type || undefined,
						destination_main_port_id : shipmentData?.destination_main_port_id || undefined,
						origin_main_port_id      : shipmentData?.origin_main_port_id || undefined,
						service_id               : singleServiceData?.id,
						truck_type               : singleServiceData?.truck_type,
						transport_modes          : singleServiceData?.service_type === 'haulage_freight_service'
										&& singleServiceData?.shipment_type === 'fcl_freight' ? ['rail'] : undefined,
					},
					shipment_id        : singleServiceData?.shipment_id,
					service_type       : singleServiceData?.service_type,
					preferred_currency : 'USD',
					refresh_rates      : !isPreferenceSet && !['cancelled', 'completed']
						.includes(shipmentData.state),
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [singleServiceData, isPreferenceSet, shipmentData, trigger, user_profile, packages]);
	useEffect(() => {
		if (singleServiceData) {
			listRevenueAvailableRates();
		}
	}, [singleServiceData, listRevenueAvailableRates]);
	return {
		loading,
		data,
	};
};
export default useListRevenueDeskAvailableRates;
