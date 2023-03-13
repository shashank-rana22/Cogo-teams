import { useRequestAir } from '@cogoport/request';

const usePackingList = () => {
	const [{ data = {} }, trigger] = useRequestAir(
		{
			url    : '/air-coe/document/list',
			method : 'get',
			// authKey : 'get_air_coe_pending_tasks_list',92ui\
		},
		{ manual: true },
	);

	const packingList = async ({ item }) => {
		try {
			await trigger({
				params: {
					shipmentId   : item?.shipmentId,
					documentType : 'packing_list',
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
