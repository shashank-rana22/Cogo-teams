import { useRequest } from '@cogoport/request';
import { useCallback, useMemo } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 100;

const useGetBillingAdresses = ({ orgId = '', setBillingAddresses = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_billing_addresses',
		method : 'get',
	}, { manual: true });

	const params = useMemo(() => ({
		filters    : { organization_id: orgId, trade_party_type: 'self' },
		page_limit : DEFAULT_PAGE_LIMIT,
		page       : DEFAULT_PAGE,
	}), [orgId]);

	const getOrgBillingAddresses = useCallback(async () => {
		try {
			const response = await trigger({
				params,
			});
			setBillingAddresses((previous) => [...previous, ...(response?.data?.list || [])]);
		} catch (error) {
			// console.error(error, 'error');
		}
	}, [params, setBillingAddresses, trigger]);

	return {
		billingAddressesLoading: loading,
		getOrgBillingAddresses,
	};
};
export default useGetBillingAdresses;
