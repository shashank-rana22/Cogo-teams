import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getListPromoCode = ({ activeMessageCard }) => {
	// const [pagination, setPagination] = useState({ page: 1 });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_promocodes',
		method : 'get',
	}, { manual: true });
	const fetchListPromoCode = async () => {
		await trigger({
			params: {
				filters: {
					organization_id: 'bbde20db-d8b8-4be7-8307-367666847041',
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

	// const { loading = false, data: responseData = {} } = listCampaignSegment;
	// const { list = [], ...paginationData } = responseData;
};

export default getListPromoCode;
