import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGE_VALUE = 1;

const useListOrganizationAssets = ({ id = '', assetIds = [] }) => {
	const [page, setPage] = useState(DEFAULT_PAGE_VALUE);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_assets',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(async () => {
		if (isEmpty(assetIds)) return;
		try {
			await trigger({
				params: {
					filters: {
						organization_id : id,
						status          : 'active',
						id              : assetIds,
					},
					page_limit: 20,
					page,
				},
			});
		} catch (e) {
			toastApiError(e);
		}
	}, [assetIds, id, page, trigger]);

	useEffect(() => {
		if (id) {
			getData();
		}
	}, [id, getData]);

	return {
		loading,
		data,
		getData,
		setPage,
	};
};

export default useListOrganizationAssets;
