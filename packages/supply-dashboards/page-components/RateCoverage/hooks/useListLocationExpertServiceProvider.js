import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListLocationExpertServiceProvider = ({
	cogo_entity_id,
	service_expertise_destination_location_id,
	service_expertise_origin_location_id,
	supply_agent_id,
	page,
	labeledValue,

}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_location_expert_service_providers',
		method : 'GET',
	}, { manual: true });
	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						service_expertise_origin_location_id,
						service_expertise_destination_location_id,
						service: 'fcl_freight',
						supply_agent_id:
							labeledValue === 'relevant_records' ? undefined : supply_agent_id,
						cogo_entity_id,
					},
					page,
				},
			});
		} catch (e) {
			// console.log(e);
		}
	}, [cogo_entity_id, labeledValue,
		page, service_expertise_destination_location_id,
		service_expertise_origin_location_id, supply_agent_id, trigger]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useListLocationExpertServiceProvider;
