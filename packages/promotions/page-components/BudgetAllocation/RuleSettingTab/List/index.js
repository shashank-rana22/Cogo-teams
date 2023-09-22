import useGetListPromotionRule from '../../../../hooks/useGetListPromotionRule';

import ListContent from './ListContent';
import ListHeader from './ListHeader';

function List({
	activeList = '',
	setActiveList = () => {},
	activeService = '',
	setShowAddRuleForm = () => {},
}) {
	const defaultFilters = { activeList, activeService };
	const DEFAULT_PARAMS = {
		cogo_entity_data_required     : true,
		slab_configs_data_required    : true,
		agent_rules_data_required     : true,
		updated_by_user_data_required : true,
		discount_config_data_required : true,
	};
	const { data, loading, filters, setFilters, refetch } = useGetListPromotionRule({
		defaultFilters,
		defaultParams: DEFAULT_PARAMS,
	});

	const refetchList = () => {
		refetch();
	};

	return (
		<div>
			<ListHeader
				filters={filters}
				setFilters={setFilters}
				activeList={activeList}
				setActiveList={setActiveList}
				activeService={activeService}
				setShowAddRuleForm={setShowAddRuleForm}
			/>
			<ListContent
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
				activeList={activeList}
				refetchList={refetchList}
				activeService={activeService}
			/>
		</div>
	);
}
export default List;
