import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const allFieldsPresent = (value, controls) => {
	const msg = [];
	controls.forEach((item) => {
		if (
			item.requirement
			&& isEmpty(value?.[item.name])
		) {
			msg.push(item);
		}
	});
	return !(msg.length > 0);
};

const useGetSpotNegotiationRate = ({ values, controls, service }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_spot_negotiation_rate',
	}, { manual: true });

	const fetch = async (val) => {
		const {
			spot_negotiation_id,
			origin_main_port_id,
			destination_main_port_id,
			service_provider_id,
			shipping_line_id,
			airline_id,
		} = values;
		try {
			const handleData = await trigger({
				params: {
					spot_negotiation_id : spot_negotiation_id || val?.spot_negotiation_id,
					service_provider_id : service_provider_id || val?.service_provider_id,
					[service]           : {
						shipping_line_id         : shipping_line_id || val?.shipping_line_id || undefined,
						origin_main_port_id      : origin_main_port_id || undefined,
						destination_main_port_id : destination_main_port_id || undefined,
						airline_id               : airline_id || undefined,
					},

				},
			});
			return handleData;
		} catch (err) {
			return null;
		}
	};

	const isAllPresent = allFieldsPresent(values, controls);

	const {
		origin_main_port_id,
		destination_main_port_id,
		service_provider_id,
		airline_id,
		shipping_line_id,
	} = values;

	useEffect(() => {
		if (isAllPresent) {
			fetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service_provider_id,
		origin_main_port_id,
		destination_main_port_id,
		airline_id,
		shipping_line_id,
	]);

	return {
		fetch,
		data,
		loading,
		isAllPresent,
	};
};

export default useGetSpotNegotiationRate;
