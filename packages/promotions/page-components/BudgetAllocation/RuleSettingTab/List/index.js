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
	const defaultFilters = {
		status          : activeList,
		primary_service : activeService,
		categories      : ['business'],
	};
	const DEFAULT_PARAMS = {
		cogo_entity_data_required     : true,
		slab_configs_data_required    : true,
		agent_rules_data_required     : true,
		updated_by_user_data_required : true,
		discount_config_data_required : true,
	};
	const { data, loading, filters, setFilters, listPromotionRule } = useListPromotionRules({
		defaultFilters,
		defaultParams: DEFAULT_PARAMS,
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
				refetchList={listPromotionRule}
				setViewAndEditRuleId={setViewAndEditRuleId}
			/>
		</div>
	);
}
export default List;
