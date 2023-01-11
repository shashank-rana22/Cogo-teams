import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetRates = ({ service, selectedRate }) => {
	const apiMapping = {
		fcl_freight : '/get_fcl_freight_rate',
		air_freight : '/get_air_freight_rate',
		lcl_freight : '/get_lcl_freight_rate',
	};

	const api = apiMapping[service?.service];

	const [{ data:systemData }, triggerSystemData] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const [{ data:revertedData }, triggerRevertedData] = useRequest({
		method : 'get',
		url    : '/get_spot_negotiation_rate',
	}, { manual: true });
	const fetchSystemData = async () => {
		try {
			await triggerSystemData({
				params: {
					origin_port_id           : selectedRate.origin_port_id,
					destination_port_id      : selectedRate?.destination_port_id,
					origin_airport_id        : selectedRate?.origin_airport_id,
					destination_airport_id   : selectedRate?.destination_airport_id,
					origin_main_port_id      : selectedRate?.origin_main_port_id,
					destination_main_port_id : selectedRate?.destination_main_port_id,
					container_size           : selectedRate?.container_size,
					container_type           : selectedRate?.container_type,
					commodity                : selectedRate?.commodity,
					service_provider_id      : selectedRate?.service_provider_id,
					shipping_line_id         : selectedRate?.shipping_line_id,
					importer_exporter_id     : selectedRate?.importer_exporter_id,
					rate_not_available_entry : false,

				},
			});
		} catch (err) {
			console.log(err);
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
			console.log(err);
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
		data: systemData || revertedData,
	};
};
export default useGetRates;
