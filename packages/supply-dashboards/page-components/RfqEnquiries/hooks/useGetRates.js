import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetRates = ({ service, selectedRate }) => {
	const apiMapping = {
		fcl_freight     : '/get_fcl_freight_rate',
		air_freight     : '/get_air_freight_rate',
		lcl_freight     : '/get_lcl_freight_rate',
		trailer_freight : './get_haulage_freight_rate',
		haulage_freight : './get_haulage_freight_rate',
		ltl_freight     : './get_ltl_freight_rate',
		ftl_freight     : './get_ftl_freight_rate',
		fcl_customs     : './get_fcl_customs_rate',
		lcl_customs     : './get_lcl_customs_rate',
		air_customs     : './get_air_customs_rate',
		fcl_cfs         : './get_fcl_cfs_rate',
	};

	const api = apiMapping[service?.service];

	const [{ data:systemData, loading: loadingSystemRates }, triggerSystemData] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const [{ data:revertedData, loading: loadingRevertedRates }, triggerRevertedData] = useRequest({
		method : 'get',
		url    : '/get_spot_negotiation_rate',
	}, { manual: true });
	const fetchSystemData = async () => {
		try {
			await triggerSystemData({
				params: {
					origin_port_id         : selectedRate.origin_port_id,
					destination_port_id    : selectedRate?.destination_port_id,
					origin_airport_id      : selectedRate?.origin_airport_id,
					destination_airport_id : selectedRate?.destination_airport_id,
					origin_main_port_id:
						selectedRate?.origin_main_port_id ? selectedRate?.origin_main_port_id : undefined,
					destination_main_port_id:
						selectedRate?.destination_main_port_id ? selectedRate?.destination_main_port_id : undefined,
					container_size      : selectedRate?.container_size,
					container_type      : selectedRate?.container_type,
					commodity           : selectedRate?.commodity ? selectedRate?.commodity : undefined,
					service_provider_id : selectedRate?.service_provider_id,
					shipping_line_id:
						selectedRate?.shipping_line_id ? selectedRate?.shipping_line_id : undefined,
					importer_exporter_id:
						selectedRate?.importer_exporter_id ? selectedRate?.importer_exporter_id : undefined,
					cogo_entity_id          : selectedRate?.cogo_entity_id ? selectedRate?.cogo_entity_id : undefined,
					origin_location_id      : selectedRate?.origin_location_id,
					destination_location_id : selectedRate?.destination_location_id,
					airline_id              : selectedRate?.airline_id,
					operation_type          : selectedRate?.operation_type,
					price_type              : selectedRate?.price_type,
					truck_type              : selectedRate?.truck_type,
					trip_type               : selectedRate?.trip_type ? selectedRate?.trip_type : undefined,
					location_id             : selectedRate?.location_id,
					trade_type              : selectedRate?.trade_type,
					cargo_handling_type     : selectedRate?.cargo_handling_type,
					haulage_type            : selectedRate?.haulage_type,
					transport_modes         : selectedRate?.transport_modes,
					trailer_type            : selectedRate?.trailer_type ? selectedRate?.trailer_type : undefined,
					transit_type            : selectedRate?.transit_type ? selectedRate?.transit_type : undefined,

				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	const fetchRevertedData = async () => {
		try {
			await triggerRevertedData({
				params: {
					spot_negotiation_id : selectedRate?.spot_negotiation_id,
					service_provider_id : selectedRate?.service_provider?.id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		if (selectedRate) {
			if (selectedRate?.spot_negotiation_id) {
				fetchRevertedData();
			} else {
				fetchSystemData();
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data    : systemData || revertedData,
		loading : loadingRevertedRates || loadingSystemRates,
	};
};
export default useGetRates;
