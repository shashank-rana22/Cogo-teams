import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetListDocuments({ shipment_data, filters = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_documents',
		method : 'GET',
	}, { manual: true });

	const { id } = shipment_data;

	const listDocuments = useCallback(() => {
		(async () => {
			const filter = {
				filters: {
					q                  : filters?.q || undefined,
					shipment_id        : id,
					service_type       : filters?.service || undefined,
					uploaded_by_org_id : filters?.source || undefined,
				},
			};
			try {
				const res = await trigger({
					params: {
						...filter,
						additional_methods : ['pagination', 'organizations'],
						page               : 1,
						page_limit         : 10,
						sort_by            : 'created_at',
						sort_type          : 'desc',
					},
				}); if (!res.hasError) {
					// Toast.error('dsfghj');
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, id, filters]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments, filters]);

	return {
		loading,
		refetch : listDocuments,
		list    : data,
	};
}

export default useGetListDocuments;
