import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import FormatData from '../utils/formatData';

const useGetOmnichannelCustomerInsights = ({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab,
	serviceType = '',
	customerId,
	sender,
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
					user_id       : !isEmpty(userId) ? userId : undefined,
					mobile_number : isEmpty(userId) ? userMobile : undefined,
					service       : serviceType,
					channel       : activeTab === 'message' ? activeMessageCard?.channel_type : 'voice',
					sender,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (!(isEmpty(userId)) || !(isEmpty(userMobile))) {
			fetchOmnichannelCustomerInsights();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId, serviceType]);

	return {
		data,
		loading,
		fetchOmnichannelCustomerInsights,
	};
};
export default useGetOmnichannelCustomerInsights;
