import { useEffect, useCallback } from 'react';
import { useRequest } from '@cogoport/request';

const useGetChannel = ({ channel_id }) => {

	// const {
	// 	trigger,
	// 	loading: isGettingShipment,
	// 	data: shipment,
	// } = useRequest('get', false, scope)('/get_chat_channel');

	const [{ loading: isGettingShipment, data: shipment }, trigger] = useRequest({
		url: 'get_chat_channel',
		method: 'GET',
	}, { manual: true });

	const getChannel = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						id: channel_id,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, channel_id]);

	// const getChannel = () => {
	// 	return trigger({
	// 		params: {
	// 			id: channel_id,
	// 		},
	// 	});
	// };

	const primary_service = shipment?.primary_service_detail;
	const shipment_data = shipment?.summary || {};

	useEffect(() => {
		getChannel();
	}, [channel_id]);

	return {
		get: {
			isGettingShipment,
			refetch: getChannel,
			data: {
				shipment_data,
				primary_service,
			},
		},
		personal_data: shipment,
	};
};

export default useGetChannel;
