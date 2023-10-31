import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const SERVICE_NAMES = [
	'fcl_customs_charges',
	'air_customs_charges',
	'lcl_customs_charges',
	'lcl_freight_charges',
	'fcl_freight_charges',
	'haulage_freight_charges',
	'air_freight_surcharges',
	'air_freight_local_charges',
	'fcl_freight_local_charges',
	'air_freight_charges',
];

const useGetChargeCodes = ({
	service_name = 'fcl_customs_charges',
	trade_type = null,
	cfsChargeRequired = false,
}) => {
	const [{ data }, trigger] = useRequest(
		{
			url    : '/list_rate_charge_codes',
			method : 'get',
		},
		{ manual: true },
	);

	const listApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_name,
				},
			});
		} catch (error) {
			// console.error(error);
		}
	}, [service_name, trigger]);

	const list = (data?.list || [])
		.map((item) => ({
			...item,
			label : `${item.code} ${item.name}`,
			value : item.code,
		}))
		.filter(
			(item) => !trade_type
				|| !item?.trade_types
				|| (item?.trade_types || []).includes(trade_type),
		);

	useEffect(() => {
		if (SERVICE_NAMES.includes(service_name) || cfsChargeRequired) {
			listApi();
		}
	}, [service_name, cfsChargeRequired, listApi]);

	return { list };
};

export default useGetChargeCodes;
