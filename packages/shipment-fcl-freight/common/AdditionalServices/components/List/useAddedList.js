import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useList = ({ shipment_id, shipment_data, filters = {} }) => {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));

	const { trigger, loading, data } = useRequest(
		'get',
		false,
		scope,
	)('list_shipment_additional_services');

	const getListApi = async () => {
		await trigger({
			params: {
				performed_by_org_id : shipment_data?.importer_exporter_id,
				filters             : {
					shipment_id,

					...(filters || {}),
				},
			},
		});
	};

	useEffect(() => {
		if (shipment_id) {
			getListApi();
		}
	}, [shipment_id]);

	return {
		loading,
		list    : data?.list || [],
		refetch : getListApi,
	};
};
export default useList;
