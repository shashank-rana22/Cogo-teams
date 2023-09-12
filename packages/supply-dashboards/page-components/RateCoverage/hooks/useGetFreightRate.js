import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	air_freight : 'get_air_freight_rate',
};

const useGetFreightRate = ({ filter, cardData }) => {
	const endPoint = API_NAME[filter?.service];

	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { id } = partner;
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const fclParams = {
		origin_port_id      : cardData?.origin_port_id,
		destination_port_id : cardData?.destination_port_id,
		shipping_line_id    : cardData?.shipping_line_id,
		service_provider_id : cardData?.service_provider_id,
	};
	const airParams = {
		origin_airport_id      : cardData?.origin_airport_id,
		destination_airport_id : cardData?.destination_airport_id,
		airline_id             : cardData?.airline_id,
		service_provider_id    : cardData?.service_provider_id,
	};
	const paramsMapping = filter?.service === 'air_freight' ? airParams : fclParams;

	const getFreightRate = async () => {
		try {
			await trigger({
				params: {
					id             : cardData?.id,
					// origin_port_id      : cardData?.origin_port_id,
					// destination_port_id : cardData?.destination_port_id,
					commodity      : cardData?.commodity,
					container_size : cardData?.container_size,
					container_type : cardData?.container_type,
					cogo_entity_id : id || undefined,
					...paramsMapping,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		getFreightRate,
		data,
		loading,
	};
};

export default useGetFreightRate;
