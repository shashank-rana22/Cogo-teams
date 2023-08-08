import { useRequest } from '@cogoport/request';

// const api = {
// 	fcl_freight : 'list_fcl_freight_rates',
// 	lcl_freight : 'list_lcl_freight_rates',
// 	air_freight : 'list_air_freight_rates',
// };

const useListRateChargeCodes = ({ service }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_rate_charge_codes',
		method : 'GET',
	}, { manual: true });

	const listRateChargeCodes = async () => {
		// const finalFilter = Object.fromEntries(
		// 	Object.entries(filter).filter(([, value]) => value !== ''),
		// );
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					service_name: service,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		data,
		loading,
		listRateChargeCodes,
	};
};
export default useListRateChargeCodes;
