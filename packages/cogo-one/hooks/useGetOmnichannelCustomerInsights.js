import { isEmpty } from '.pnpm/@firebase+util@1.9.2/node_modules/@firebase/util';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

const useGetOmnichannelCustomerInsights = ({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab,
	serviceType = '',
	customerId,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_customer_insights',
		method : 'get',
	}, { manual: true });

	const { userId = '', userMobile = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const fetchOmnichannelCustomerInsights = async () => {
		try {
			await trigger({
				params: {
					user_id : isEmpty(userId) ? userMobile : userId,
					service : serviceType,
					channel : activeTab === 'message' ? activeMessageCard?.channel_type : 'voice',
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!(isEmpty(userId)) || !(isEmpty(userMobile))) {
			fetchOmnichannelCustomerInsights();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId, serviceType]);
	console.log('customerId', customerId);

	return {
		data,
		loading,
		fetchOmnichannelCustomerInsights,
	};
};
export default useGetOmnichannelCustomerInsights;
