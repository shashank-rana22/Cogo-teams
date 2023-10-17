import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

export const useGetAdvancedPaymentHistory = ({ sellerOrganizationId = '' }) => {
	const [{ data, loading }, refetch] = useRequestBf(
		{
			url    : '/purchase/bills/list',
			method : 'get',
			params : {
				billDate       : undefined,
				dueDate        : undefined,
				updatedDate    : undefined,
				paymentType    : 'advanced',
				organizationId : sellerOrganizationId,
				pageSize       : 6,
			},
			authKey: 'get_purchase_bills_list',
		},
		{ manual: false },
	);

	useEffect(() => {
		const getStatsData = async () => {
			try {
				await refetch();
			} catch (err) {
				Toast.error('stats data not present');
			}
		};
		getStatsData();
	}, [refetch, sellerOrganizationId]);

	return {
		loading,
		data: data?.list,
	};
};
