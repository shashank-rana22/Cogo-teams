import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetListPromotions = ({ organizationId = '' }) => {
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
					organization_id  : organizationId,
				},

			},
		});
	};

	useEffect(() => {
		if (organizationId) {
			fetchListPromoCode();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		promoData    : data,
		promoLoading : loading,
	};
};

export default useGetListPromotions;
