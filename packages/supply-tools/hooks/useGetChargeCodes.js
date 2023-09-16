import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetChargeCodes = ({
	service_name = 'fcl_freight_charges',
	trade_type = null,
}) => {
	const [{ data: listRateChargeCodes }, trigger] = useRequest({
		url    : '/list_rate_charge_codes',
		method : 'GET',
	}, { manual: false });

	const listApi = useCallback(async () => trigger({
		params: {
			service_name,
		},
	}), [service_name, trigger]);

	const list = (listRateChargeCodes?.list || [])
		.map((item) => ({
			...(item || {}),
			label: `${item?.code} ${item?.name}`,
		}))
		.filter(
			(item) => !trade_type
				|| !item?.trade_types
				|| (item?.trade_types || []).includes(trade_type),
		);

	useEffect(() => {
		listApi();
	}, [listApi]);

	return { list };
};

export default useGetChargeCodes;
