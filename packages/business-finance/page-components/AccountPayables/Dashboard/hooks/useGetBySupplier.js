import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetBySupplier = ({ showVendorsList, activeEntity }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : 'payments/outstanding/top-ten-service-providers',
			method  : 'get',
			authKey : 'get_payments_outstanding_top_ten_service_providers',
		},
		{ manual: true, autoCancel: false },
	);

	const getDahboardData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						entityCode : activeEntity,
						sortBy     : 'openInvoiceAmount',
						sortType   : 'Desc',
						category   : showVendorsList || undefined,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [showVendorsList, activeEntity, trigger]);

	useEffect(() => {
		getDahboardData();
	}, [showVendorsList, getDahboardData]);

	return {
		data,
		loading,
		getDahboardData,
	};
};

export default useGetBySupplier;
