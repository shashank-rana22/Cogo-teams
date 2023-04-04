import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListOrganizationInvoicingParties = ({ params }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_invoicing_parties',
		method : 'GET',
	});

	const getInvoicingParties = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params,
				});
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, params]);

	useEffect(() => {
		getInvoicingParties();
	}, [getInvoicingParties]);

	return {
		loading,
		data,
		refetch: getInvoicingParties,
	};
};
export default useListOrganizationInvoicingParties;
