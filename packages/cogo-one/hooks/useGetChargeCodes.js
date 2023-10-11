import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const SERVICE_NAMES = {
	fcl_freight : 'fcl_freight_charges',
	lcl_freight : 'lcl_freight_charges',
	air_freight : 'air_freight_charges',
	haulage     : 'haulage_freight_charges',
	fcl_customs : 'fcl_customs_charges',
	air_customs : 'air_customs_charges',
	lcl_customs : 'lcl_customs_charges',
	fcl_cfs     : 'fcl_cfs_charges',
};

const useGetChargeCodes = ({
	service_name,
}) => {
	const [{ data }, trigger] = useRequest(
		{
			url    : '/list_rate_charge_codes',
			method : 'get',
		},
		{ manual: true },
	);

	const listApi = useCallback(async () => {
		const service = SERVICE_NAMES[service_name];

		try {
			await trigger({
				params: { service_name: service },
			});
		} catch (error) {
			// console.error(error);
		}
	}, [service_name, trigger]);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return { data };
};

export default useGetChargeCodes;
