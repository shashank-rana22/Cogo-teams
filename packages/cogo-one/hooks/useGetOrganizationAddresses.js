import { useRequest } from '@cogoport/request';
import { useCallback, useMemo } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 100;

const useGetOrganizationAddresses = ({ orgId = '', setBillingAddresses = () => {} }) => {
	const [{ loading }, addressApiTrigger] = useRequest({
		url    : '/list_organization_addresses',
		method : 'get',
	}, { manual: true });

	const params = useMemo(() => ({
		filters    : { organization_id: orgId, trade_party_type: 'self' },
		page_limit : DEFAULT_PAGE_LIMIT,
		page       : DEFAULT_PAGE,
	}), [orgId]);

	const getOrganizationAddresses = useCallback(async () => {
		try {
			const response = await addressApiTrigger({
				params,
			});
			setBillingAddresses((previous) => [...previous, ...(response?.data?.list || [])]);
		} catch (error) {
			// console.error(error, 'error');
		}
	}, [addressApiTrigger, params, setBillingAddresses]);

	return {
		addressesLoading: loading,
		getOrganizationAddresses,
	};
};
export default useGetOrganizationAddresses;
