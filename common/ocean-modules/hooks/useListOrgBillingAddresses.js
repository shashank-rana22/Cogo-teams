import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListOrganizationBillingAddresses = ({
	watchModeOfExecution = '',
	organization_id = '',
}) => {
	const geo = getGeoConstants();

	const api = watchModeOfExecution === 'pickup'
		? '/list_partner_addresses'
		: '/list_organization_billing_addresses';

	const payload =		watchModeOfExecution === 'pickup'
		? { partner_id: geo.uuid.parent_entity_id }
		: {
			organization_id,
			trade_party_type: 'self',
		};

	const [{ loading, data }, trigger] = useRequest({
		url    : api,
		params : {
			filters: payload,
		},

	}, { manual: true });

	const [{ loading: orgPocLoading, data: orgPocData }, orgPocTrigger] = useRequest({
		url    : 'list_organization_pocs',
		params : {
			organization_id,
		},

	}, { manual: true });

	useEffect(() => {
		if (organization_id && watchModeOfExecution) {
			if (watchModeOfExecution !== 'pickup') {
				trigger();
			} else {
				orgPocTrigger();
			}
		}
	}, [organization_id, watchModeOfExecution, trigger, orgPocTrigger]);

	return {
		billingAddressData : data?.list,
		loading,
		trigger,
		orgPocLoading,
		orgPocData         : orgPocData?.list,
		orgPocTrigger,
	};
};

export default useListOrganizationBillingAddresses;
