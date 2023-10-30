import { useMemo } from 'react';

import useListPromotionRules from '../../../../hooks/useListPromotionRules';

import ListContent from './ListContent';
import ListHeader from './ListHeader';

function List({
	activeList = '',
	setActiveList = () => {},
	activeService = '',
	setViewAndEditRuleId = () => {},
	setShowAddRuleForm = () => {},
}) {
	const defaultFilters = useMemo(() => ({
		status          : activeList,
		primary_service : activeService,
		categories      : ['business'],
	}), [activeList, activeService]);

	const { data, loading, filters, setFilters, getListRules } = useListPromotionRules({
		defaultFilters,
		defaultParams: {
			cogo_entity_data_required     : true,
			slab_configs_data_required    : true,
			agent_rules_data_required     : true,
			updated_by_user_data_required : true,
			discount_config_data_required : true,
		},
	});

	return (
		<div>
			<ListHeader
				filters={filters}
				setFilters={setFilters}
				activeList={activeList}
				setActiveList={setActiveList}
				setShowAddRuleForm={setShowAddRuleForm}
			/>
			<ListContent
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
				activeList={activeList}
				refetchList={getListRules}
				setViewAndEditRuleId={setViewAndEditRuleId}
			/>
		</div>
	);
}
export default List;
