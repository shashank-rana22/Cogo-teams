import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetListDocuments({ shipment_data = {}, filters = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_documents',
		method : 'GET',
	}, { manual: true });

	const { id = '' } = shipment_data;

	const { q, service, uploaded_by_org_id } = filters;

	const listDocuments = useCallback(() => {
		(async () => {
			const filter = {
				filters: {
					q,
					shipment_id        : id,
					service_type       : service || undefined,
					uploaded_by_org_id : uploaded_by_org_id || undefined,
				},
			};
			try {
				await trigger({
					params: {
						...filter,
						additional_methods : ['pagination', 'organizations'],
						page               : 1,
						page_limit         : 1000,
						sort_by            : 'created_at',
						sort_type          : 'desc',
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, id, q, service, uploaded_by_org_id]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments]);

	return {
		loading,
		refetch : listDocuments,
		list    : data,
	};
}

export default useGetListDocuments;
