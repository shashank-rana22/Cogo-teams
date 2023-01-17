import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const allFieldsPresent = (value, controls) => {
	const msg = [];
	controls.forEach((item) => {
		if (
			item.requirement
			&& isEmpty(value[item.name])
		) {
			msg.push(item);
		}
	});
	return !(msg.length > 0);
};

const useGetSpotNegotiationRate = ({ values, controls }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_spot_negotiation_rate',
	}, { manual: true });

	const fetch = async (val) => {
		const { spot_negotiation_id, service_provider_id } = values;
		try {
			const handleData = await trigger({
				params: {
					spot_negotiation_id : spot_negotiation_id || val?.spot_negotiation_id,
					service_provider_id : service_provider_id || val?.service_provider_id,
				},
			});
			return handleData;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const isAllPresent = allFieldsPresent(values, controls);

	useEffect(() => {
		if (isAllPresent) {
			fetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.service_provider_id, values.shipping_line_id, values.airline_id]);

	return {
		fetch,
		data,
		loading,
	};
};

export default useGetSpotNegotiationRate;
