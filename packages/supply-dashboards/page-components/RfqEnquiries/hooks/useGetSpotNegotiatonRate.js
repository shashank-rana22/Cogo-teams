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

const useGetSpotNegotiationRate = ({ values, controls, service }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_spot_negotiation_rate',
	}, { manual: true });

	const fetch = async () => {
		const { spot_negotiation_id, service_provider_id, ...rest } = values;
		try {
			await trigger({
				params: {
					spot_negotiation_id,
					service_provider_id,
					[service]: rest,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const isAllPresent = allFieldsPresent(values, controls);

	useEffect(() => {
		if (isAllPresent) {
			fetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAllPresent]);

	return {
		fetch,
		data,
		loading,
	};
};

export default useGetSpotNegotiationRate;
