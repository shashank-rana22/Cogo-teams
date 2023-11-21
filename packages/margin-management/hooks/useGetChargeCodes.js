/* eslint-disable custom-eslint/variables-name-check */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

const chargeCodes = {
	fcl_freight     : ['fcl_freight_charges', 'fcl_freight_local_charges'],
	ftl_freight     : ['ftl_freight_charges'],
	haulage_freight : ['haulage_freight_charges'],
	fcl_customs     : ['fcl_customs_charges'],
	air_freight     : [
		'air_freight_charges',
		'air_freight_local_charges',
		'air_freight_surcharges',
		'air_freight_warehouse_charges',
	],
	air_customs : ['air_customs_charges'],
	lcl_freight : [
		'lcl_freight_charges',
		'lcl_freight_local_charges',
		'lcl_freight_surcharge_charges',
	],
	lcl_customs           : ['lcl_customs_charges'],
	ltl_freight           : ['ltl_freight_charges'],
	fcl_cfs               : ['fcl_cfs_charges'],
	fcl_freight_local     : ['fcl_freight_local_charges'],
	lcl_freight_local     : ['lcl_freight_local_charges'],
	rail_domestic_freight : ['rail_domestic_freight_charges'],
};

function useGetChargeCodes({ service = '', setChargeCodes = () => { } }) {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/list_rate_charge_codes',
		},
		{ manual: false },
	);

	const getChargeCodesApi = useCallback(async (serviceName) => {
		try {
			const response = await trigger({
				params: {
					service_names: chargeCodes[serviceName],
				},
			});

			if (response.hasError) {
				return [];
			}

			return response?.data?.list || [];
		} catch (e) {
			return [];
		}
	}, [trigger]);

	const getApi = useCallback(async () => {
		const allPromises = [];

		// (chargeCodes[service] || []).forEach((service_name) => {
		allPromises.push(getChargeCodesApi(service));
		// });

		try {
			const values = await Promise.all(allPromises);

			const allCharges = [];

			values?.forEach((item) => {
				if (!isEmpty(item)) {
					allCharges.push(...(item || []));
				}
			});

			const arr = (allCharges || []).map((i) => ({
				...i,
				label : i?.name,
				value : i?.code,
			}));

			setChargeCodes(arr || []);
		} catch (error) {
			if (error?.response) {
				Toast.error(error.response?.data);
			}
		}
	}, [getChargeCodesApi, service, setChargeCodes]);

	useEffect(() => {
		getApi();
	}, [getApi, service]);

	return {
		getChargeCodesApi,
		data,
		loading,
		chargeCodeOptions: data?.list || [],
	};
}

export default useGetChargeCodes;
