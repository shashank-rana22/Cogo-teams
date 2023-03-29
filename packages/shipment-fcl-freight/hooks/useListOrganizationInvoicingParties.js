import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListOrganizationInvoicingParties = ({ params, bookingType }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_invoicing_parties',
		method : 'GET',
	});

	useEffect(() => {
		try {
			(async () => {
				await trigger({
					params,
				});
			})();
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	}, [trigger, params, bookingType]);

	return {
		loading,
		data,
	};
};
export default useListOrganizationInvoicingParties;
