import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const service_names = [
	'fcl_customs_charges',
	'air_customs_charges',
	'lcl_customs_charges',
	'lcl_freight_charges',
	'fcl_freight_charges',
	'haulage_freight_charges',
	'air_freight_surcharges',
];
const useGetChargeCodes = ({
	service_name = 'fcl_customs_charges',
	trade_type = null,
	getLocalChargeCode = false,
}) => {
	const { scope = '' } = useSelector((state) => state.general);
	const [{ data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_rate_charge_codes',
		scope,
	}, { manual: false });

	const listApi = async () => {
		try {
			await trigger({
				params: {
					service_name,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	const list = (data?.list || [])
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
		if (service_names.includes(service_name) || getLocalChargeCode) {
			listApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(service_name)]);

	return { list };
};

export default useGetChargeCodes;
