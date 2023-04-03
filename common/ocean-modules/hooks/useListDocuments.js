import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetListDocuments({ shipment_data = {}, filters = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_documents',
		method : 'GET',
	}, { manual: true });

	const { id : shipment_id = '' } = shipment_data;

	const { q, service_type, uploaded_by_org_id } = filters;

	const listDocuments = useCallback(() => {
		(async () => {
			const filter = {
				filters: {
					q,
					shipment_id,
					service_type,
					uploaded_by_org_id,
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
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, shipment_id, service_type, q, uploaded_by_org_id]);

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
