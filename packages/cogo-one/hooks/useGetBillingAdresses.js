import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 100;

const getParam = ({ orgId = '' }) => ({
	filters    : { organization_id: orgId, trade_party_type: 'self' },
	page_limit : DEFAULT_PAGE_LIMIT,
	page       : DEFAULT_PAGE,
});

const useGetBillingAdresses = ({ orgId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });

	const getOrgBillingAddresses = useCallback(async () => {
		try {
			await trigger({
				params: getParam({ orgId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [orgId, trigger]);

	return {
		getOrgBillingAddresses,
		billingAddressesLoading : loading,
		billingAddressesData    : data?.list,
	};
};
export default useGetBillingAdresses;
