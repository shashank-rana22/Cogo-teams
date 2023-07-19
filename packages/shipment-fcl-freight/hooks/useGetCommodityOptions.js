import { useRequestBf } from '@cogoport/request';

function useGetCommodityOptions({ shipment_data }) {
	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/saas/hs-code/list-commodities',
		method  : 'get',
		authKey : 'get_saas_hs_code_list_commodities',
	}, { manual: true, autoCancel: false });

	const getOptions = async () => {
		const mode = shipment_data?.shipment_type;
		const resp = await trigger({
			params: {
				service: mode,
			},
		});
		const options = (resp?.data || []).map((item) => ({
			label : item?.commodityDisplayName,
			value : item?.commodity,
		}));
		return options;
	};

	return {
		loading,
		allCommodity: data,
		getOptions,
	};
}

export default useGetCommodityOptions;
