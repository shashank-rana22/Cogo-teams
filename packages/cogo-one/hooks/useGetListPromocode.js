// import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getListPromotions = ({ activeMessageCard, activeVoiceCard, activeTab }) => {
	const { organization_id } = activeVoiceCard || {};
	const { organization_id: MessageOrgId } = activeMessageCard || {};
	// const [pagination, setPagination] = useState({ page: 1 });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_promotions',
		method : 'get',
	}, { manual: true });
	const fetchListPromoCode = async () => {
		let id;
		if (activeTab === 'voice') {
			id = organization_id;
		} else {
			id = MessageOrgId;
		}
		await trigger({
			params: {
				promocodes_required : true,
				discounts_required  : true,
				filters             : {
					status           : 'published',
					consumption_mode : 'manual',
					category         : 'marketing',
					organization_id  : id,
				},
				// page: pagination?.page,
			},
		});
	};

	useEffect(() => {
		fetchListPromoCode();
	}, [activeMessageCard, activeVoiceCard]);

	return {
		promoData    : data,
		promoLoading : loading,
	};
};

export default getListPromotions;
