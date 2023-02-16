// import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getListPromotions = ({ activeMessageCard }) => {
	// const [pagination, setPagination] = useState({ page: 1 });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_promotions',
		method : 'get',
	}, { manual: true });
	const fetchListPromoCode = async () => {
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
	};

	useEffect(() => {
		fetchListPromoCode();
	}, [activeMessageCard]);

	return {
		promoData    : data,
		promoLoading : loading,
	};
};

export default getListPromotions;
