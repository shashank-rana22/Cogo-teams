import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const useListOrganizationInvoicingParties = ({ params = {} }) => {
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
				toastApiError(err);
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
