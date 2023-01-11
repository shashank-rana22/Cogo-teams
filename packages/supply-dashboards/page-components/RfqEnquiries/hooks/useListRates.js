import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetRates = ({ service }) => {
	const apiMapping = {
		lcl_freight : '/list_lcl_freight_rates',
		fcl_freight : '/list_fcl_freight_rates',
		air_freight : '/list_air_freight_rates',
	};

	const api = apiMapping[service?.service];

	const [{ data:systemData, loading: loadingSystemRates }, triggerSystemData] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const [{ data:revertedData, loading: loadingRevertedRates }, triggerRevertedData] = useRequest({
		method : 'get',
		url    : '/list_spot_negotiation_rates',
	}, { manual: true });
	const fetchSystemData = async () => {
		try {
			await triggerSystemData({
				params: {
					filters: {
						origin_port_id           : service?.data?.origin_port_id,
						destination_port_id      : service?.data?.destination_port_id,
						rate_not_available_entry : false,
					},
					page_limit: 5,
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
					audit_data_required : true,
					filters             : {
						past_similar_negotiation_reverts_for_negotiation_id: service?.id,
					},
					page_limit: 5,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchSystemData();
		fetchRevertedData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		systemData,
		revertedData,
		loadingSystemRates,
		loadingRevertedRates,
	};
};
export default useGetRates;
