import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 100;

const getParams = ({ orgId }) => ({
	filters    : { organization_id: orgId, trade_party_type: 'self' },
	page_limit : DEFAULT_PAGE_LIMIT,
	page       : DEFAULT_PAGE,
});

const useGetOrganizationAddresses = ({ orgId = '' }) => {
	const [{ data, loading }, addressApiTrigger] = useRequest({
		url    : '/list_organization_addresses',
		method : 'get',
	}, { manual: true });

	const getOrganizationAddresses = useCallback(() => {
		try {
			addressApiTrigger({
				params: getParams({ orgId }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [addressApiTrigger, orgId]);

	return {
		getOrganizationAddresses,
		addressesLoading : loading,
		orgAddressesData : data?.list,
	};
};
export default useGetOrganizationAddresses;
