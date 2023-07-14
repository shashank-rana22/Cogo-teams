import { useRequestAir } from '@cogoport/request';

const usePackingList = () => {
	const [{ data = {} }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents/list',
			method  : 'get',
			authKey : 'get_air_coe_documents_list',
		},
		{ manual: true },
	);

	const packingList = async ({ item }) => {
		try {
			await trigger({
				params: {
					shipmentId   : item?.shipmentId,
					documentType : ['packing_list', 'shipping_instruction'],
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		packingData: data,
		packingList,
	};
};
export default usePackingList;
