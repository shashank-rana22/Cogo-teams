import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOmnichannelCustomerInsights = ({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab,
	serviceType = '',

}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_customer_insights',
		method : 'get',
	}, { manual: true });

	const fetchOmnichannelCustomerInsights = async () => {
		await trigger({
			params: {
				user_id : activeTab === 'message' ? activeMessageCard?.user_id : activeVoiceCard?.user_id,
				// user_id : '2d8ff7d8-7d08-43b8-947e-5fc7da7fa8dc',
				service : serviceType,
				channel : activeTab === 'message' ? activeMessageCard?.channel_type : 'voice',
			},
		});
	};

	useEffect(() => {
		fetchOmnichannelCustomerInsights();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, activeVoiceCard, serviceType]);

	return {
		data,
		loading,
		fetchOmnichannelCustomerInsights,
	};
};
export default useGetOmnichannelCustomerInsights;
