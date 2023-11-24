import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

function useListFclLocals({ cardData }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : 'list_fcl_freight_rate_locals',
		method       : 'GET',
		service_name : 'fcl_freight_rate',
	}, { manual: true });

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const getData = useCallback(async (tradeType, portId) => {
		try {
			await trigger({
				params: {
					filters: {
						port_id             : portId,
						shipping_line_id    : cardData?.shipping_line_id,
						service_provider_id : cardData?.service_provider_id,
						container_size      : cardData?.container_size,
						container_type      : cardData?.container_type,
						commodity           : [cardData?.commodity],
						trade_type          : tradeType,
						cogo_entity_id      : user_data?.partner?.id || undefined,
						main_port_id        : cardData?.trade_type === 'exportr'
							? cardData?.origin_main_port_id
							: cardData?.destination_main_port_id,
						is_rate_available   : true,
						get_suggested_rates : true,
					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [cardData, trigger, user_data]);

	return {
		loading,
		data,
		getData,
	};
}

export default useListFclLocals;
