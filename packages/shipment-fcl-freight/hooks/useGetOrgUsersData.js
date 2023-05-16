import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetOrgUsersData = ({ invoice }) => {
	const [{ loading, data: orgData }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'GET',
		params : {
			filters: {
				organization_id : invoice?.billing_address?.organization_id,
				status          : 'active',
			},
		},
	}, { manual: true });

	const getTradeData = useCallback(() => {
		(
			async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger]);

	useEffect(() => {
		getTradeData();
	}, [getTradeData]);

	return {
		loading,
		orgData,
		refetch: getTradeData,
	};
};
export default useGetOrgUsersData;
