import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate',
	air_freight : 'get_air_freight_rate',
};

const useGetFreightRate = ({ filter, formValues, cardData }) => {
	const endPoint = API_NAME[filter?.service];

	const dependencyValue = {
		service_provider_id : formValues?.service_provider_id,
		shipping_line_id    : formValues?.shipping_line_id,
	};

	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;
	const { id } = partner;
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getFreightRate = async () => {
		const fclParams = {
			origin_port_id      : cardData?.origin_port_id,
			destination_port_id : cardData?.destination_port_id,
			shipping_line_id    : formValues?.shipping_line_id,
			service_provider_id : formValues?.service_provider_id,
		};
		const airParams = {
			origin_airport_id      : cardData?.origin_airport_id,
			destination_airport_id : cardData?.destination_airport_id,
			airline_id             : formValues?.airline_id,
			service_provider_id    : formValues?.service_provider_id,
		};
		const paramsMapping = filter?.service === 'air_freight' ? airParams : fclParams;
		try {
			await trigger({
				params: {
					id             : cardData?.id,
					commodity      : formValues?.commodity,
					container_size : formValues?.container_size,
					container_type : formValues?.container_type,
					cogo_entity_id : id || undefined,
					...paramsMapping,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (formValues?.service_provider_id
			&& (formValues?.shipping_line_id || formValues?.airline_id)) { getFreightRate(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(dependencyValue)]);

	return {
		data,
		loading,
	};
};

export default useGetFreightRate;
