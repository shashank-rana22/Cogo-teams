import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallBack } from 'react';

import { getServiceMode } from '../common/utils/getServiceMode';

function useGetCommodityOptions({ shipment_data }) {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/hs-code/list-commodities',
		method  : 'get',
		authKey : 'get_saas_hs_code_list_commodities',
	}, { manual: true, autoCancel: false });

	const getOptions = useCallBack(() => {
		const mode = getServiceMode(shipment_data?.shipment_type);

		try {
			trigger({
				params: {
					service: mode,
				},
			});
		} catch (err) {
			console.error(err?.data);
		}
	}, []);

	useEffect(() => {
		if (shipment_data?.shipment_type === 'fcl_freight') {
			getOptions();
		}
	}, [getOptions, shipment_data?.shipment_type]);

	let commodityTypeOptions = [];

	if (!isEmpty(data)) {
		commodityTypeOptions = (data || []).map((item) => ({
			label : item?.commodityDisplayName,
			value : item?.commodity,
		}));
	}

	return {
		loading,
		allCommodity: data,
		commodityTypeOptions,
	};
}

export default useGetCommodityOptions;
