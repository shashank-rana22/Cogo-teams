import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';
// import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetListPromotions = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	// const { organization_id } = activeVoiceCard || {};
	// const { organization_id: orgId, user_id } = getActiveCardDetails(activeMessageCard);
	const {
		orgId = '',
	} = FormatData({ activeMessageCard, activeTab, activeVoiceCard });

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
					organization_id  : orgId,
				},
				// page: pagination?.page,
			},
		});
	};

	useEffect(() => {
		if (orgId !== '') {
			fetchListPromoCode();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard]);

	return {
		promoData    : data,
		promoLoading : loading,
	};
};

export default useGetListPromotions;
