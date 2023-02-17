import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOmnichannelCustomerInsights = ({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab,
	serviceType = '',

}) => {
	console.log('activeMessageCard', activeMessageCard);
	const { user_id:userVoiceId = '' } = activeVoiceCard;

	// const { user_id: userMessageId = '' } = userData || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_omnichannel_customer_insights',
		method : 'get',
	}, { manual: true });

	const fetchOmnichannelCustomerInsights = async () => {
		await trigger({
			params: {
				// user_id : activeTab === 'message' ? activeMessageCard?.user_id : userVoiceId,
				user_id : 'a3fa1dad-6ec7-4456-b47f-29a7d0a27541',
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
