import { useRequest } from '@cogoport/request';

const useListChargeCodes = () => {
	const [{ data: chargeCodeData = {} }, trigger] = useRequest({
		url    : '/list_rate_charge_codes',
		method : 'get',
	}, { manual: true });

	const listChargeCode = async () => {
		try {
			await trigger({
				params: {
					service_names: ['air_freight_charges', 'air_freight_local_charges'],
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	return {
		chargeCodeData, listChargeCode,
	};
};
export default useListChargeCodes;
