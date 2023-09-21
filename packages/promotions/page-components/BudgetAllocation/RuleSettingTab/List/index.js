import useGetListPromotionRule from '../../../../hooks/useGetListPromotionRule';

import ListContent from './ListContent';
import ListHeader from './ListHeader';

function List({
	activeList = '',
	setActiveList = () => {},
	activeService = '',
}) {
	const defaultFilters = { activeList, activeService };
	const DEFAULT_PARAMS = {
		cogo_entity_data_required     : true,
		slab_configs_data_required    : true,
		agent_rules_data_required     : true,
		updated_by_user_data_required : true,
		discount_config_data_required : true,
	};
	const { data, loading, filters, setFilters } = useGetListPromotionRule({
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
				activeService={activeService}
			/>
			<ListContent
				data={data}
				loading={loading}
				filters={filters}
				activeList={activeList}
				activeService={activeService}
			/>
		</div>
	);
}
export default List;
