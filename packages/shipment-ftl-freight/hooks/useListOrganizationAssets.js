import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useState, useCallback } from 'react';

const useListOrganizationAssets = ({ id, truckNumbers = [] }) => {
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_assets',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							organization_id : id,
							status          : 'active',
							q               : truckNumbers,
						},
						page_limit: 200,
						page,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, id, page, truckNumbers]);

	useEffect(() => {
		if (id) {
			getData();
		}
	}, [getData, id]);

	return {
		loading,
		data,
		getData,
		setPage,
	};
};

export default useListOrganizationAssets;
