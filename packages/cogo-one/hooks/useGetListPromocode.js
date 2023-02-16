import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListPromotions({ activeMessageCard }) {
	// const [pagination, setPagination] = useState({ page: 1 });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_promotions',
		method : 'get',
	}, { manual: true });

	const fetchListPromoCode = async () => {
		try {
			await trigger({
				params: {
					promocodes_required : true,
					discounts_required  : true,
					filters             : {
						status           : 'published',
						consumption_mode : 'manual',
						category         : 'marketing',
						organization_id  : 'bbde20db-d8b8-4be7-8307-367666847041',
					},
				// page: pagination?.page,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		fetchListPromoCode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard]);

	return {
		promoData    : data,
		promoLoading : loading,
	};
}

export default useGetListPromotions;
