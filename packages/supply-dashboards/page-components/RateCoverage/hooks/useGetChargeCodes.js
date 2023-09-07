import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetChargeCodes = ({
	service_name = 'fcl_customs_charges',
	trade_type = null,
}) => {
	const [{ data }, trigger] = useRequest(
		{
			url    : '/list_rate_charge_codes',
			method : 'get',
		},
		{ manual: true },
	);

	const listApi = async () => {
		try {
			await trigger({
				params: {
					service_name,
				},
			});
		} catch (error) {
			// console.error(error);
		}
	};

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
		listApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service_name]);

	return { list };
};

export default useGetChargeCodes;
