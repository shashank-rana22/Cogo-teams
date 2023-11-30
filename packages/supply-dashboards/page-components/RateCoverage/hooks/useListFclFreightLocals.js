import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

function useListFclLocals({ cardData }) {
	const geo = getGeoConstants();

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
						service_provider_id : geo.uuid.cogoxpress_id,
						port_id             : portId,
						shipping_line_id    : cardData?.shipping_line_id,
						container_size      : cardData?.container_size,
						container_type      : cardData?.container_type,
						trade_type          : tradeType,
						cogo_entity_id      : user_data?.partner?.id || undefined,
						main_port_id        : cardData?.trade_type === 'export'
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
	}, [cardData?.container_size, cardData?.container_type,
		cardData?.destination_main_port_id, cardData?.origin_main_port_id,
		cardData?.shipping_line_id, cardData?.trade_type, geo.uuid.cogoxpress_id, trigger, user_data?.partner?.id]);

	return {
		loading,
		data,
		getData,
	};
}

export default useListFclLocals;
