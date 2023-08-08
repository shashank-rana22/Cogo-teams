import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useListAddressForInsurance = ({ organization_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_address_for_insurance',
		method : 'GET',
		params : {
			organization_id,
			billing_type: 'CORPORATE',
		},
	}, { manual: true });

	const getddressForInsurance = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (!isEmpty(organization_id)) {
			getddressForInsurance();
		}
	}, [getddressForInsurance, organization_id]);

	return {
		loading,
		data      : data || [],
		cnRefetch : getddressForInsurance,
	};
};
export default useListAddressForInsurance;
