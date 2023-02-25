import { useRequest } from '@cogoport/request';

const useGetRmsRates = ({ service }) => {
	const apiMapping = {
		lcl_freight       : '/list_lcl_freight_rates',
		fcl_freight       : '/list_fcl_freight_rates',
		air_freight       : '/list_air_freight_rates',
		air_freight_local : '/list_air_freight_rate_locals',
		fcl_freight_local : '/list_fcl_freight_rate_locals',
	};

	const api = apiMapping[service?.service];

	const [{ data:systemData, loading: loadingSystemRates }, triggerSystemData] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const fetchSystemData = async (params) => {
		try {
			await triggerSystemData({
				params,
			});
		} catch (err) {
			// console.log(err);
		}
	};

	return {
		systemData,
		loadingSystemRates,
		fetchSystemData,
	};
};
export default useGetRmsRates;
