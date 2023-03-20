import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetListDocuments({ shipment_data }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_documents',
		method : 'GET',
	}, { manual: true });

	const { id } = shipment_data;

	const listDocuments = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: {
						filters            : { shipment_id: id },
						additional_methods : ['pagination', 'organizations'],
						page               : 1,
						page_limit         : 10,
						sort_by            : 'created_at',
						sort_type          : 'desc',
					},
				}); if (!res.hasError) {
					Toast.error('dsfghj');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, id]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments]);

	return {
		loading,
		refetch : listDocuments,
		list    : data?.list,
	};
}

export default useGetListDocuments;
