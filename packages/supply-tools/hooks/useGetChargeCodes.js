import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetChargeCodes = ({
	service_name = 'fcl_freight_charges',
	trade_type = null,
}) => {
	const { scope = '' } = useSelector((state) => state.general);
	// const listRateChargeCodes = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/list_rate_charge_codes');

	const [{ data: listRateChargeCodes }] = useRequest({
		url    : '/list_rate_charge_codes',
		method : 'GET',
		scope,
	}, { manual: false });

	const listApi = async () => listRateChargeCodes.trigger({
		params: {
			service_name,
		},
	});
	const list = (listRateChargeCodes?.list || [])
		.map((item) => ({
			...item,
			label: `${item.code} ${item.name}`,
		}))
		.filter(
			(item) => !trade_type
				|| !item?.trade_types
				|| (item?.trade_types || []).includes(trade_type),
		);

	useEffect(() => {
		listApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(service_name)]);

	return { list };
};

export default useGetChargeCodes;
