import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useListOrganization({
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_organizations',
		method : 'GET',
		params : {
			...defaultParams,
		},
	}, { manual: true });

	const listOrganization = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listOrganization();
	}, [listOrganization]);

	return {
		loading,
		refetch : listOrganization,
		data    : data?.list || [],
	};
}

export default useListOrganization;
