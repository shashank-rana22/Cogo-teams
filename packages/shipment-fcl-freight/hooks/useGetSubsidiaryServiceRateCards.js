import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSubsidiaryServiceRateCards = ({ item }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_subsidiary_service_rate_cards',
		method : 'GET',
	});
	const serviceType = item?.service_type.replace('_service', '');

	useEffect(() => {
		(async () => {
			try {
				const addedService = (item.services || []).find(
					(service) => service.service_type === item.service_type,
				);

				const date = new Date();
				await trigger({
					params: {
						code                 : item.code,
						service_type         : serviceType,
						validity_end         : addedService?.schedule_arrival,
						validity_start       : date,
						location_id          : addedService?.location?.id,
						importer_exporter_id : addedService?.importer_exporter_id,
						origin_location_id:
						addedService?.origin_port_id
						|| addedService?.origin_port?.id
						|| addedService?.origin_location?.id
						|| addedService?.origin_airport?.id
						|| undefined,
						destination_location_id:
						addedService?.destination_port_id
						|| addedService?.destination_port?.id
						|| addedService?.destination_location?.id
						|| addedService?.destination_airport?.id
						|| undefined,
						container_type : addedService?.container_type,
						container_size : addedService?.container_size,
						commodity      : addedService?.commodity,
						service_provider_id:
						addedService?.service_provider_id
						|| addedService?.service_provider?.id,
						trade_type: addedService?.trade_type,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, item, serviceType]);

	return {
		loading,
		data,
	};
};
export default useGetSubsidiaryServiceRateCards;
