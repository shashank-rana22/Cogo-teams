import useListConvenienceRateConfigurations from '../../../hooks/useListConvenienceRateConfigurations';

import ListContent from './ListContent';
import ListHeader from './ListHeader';

function List({
	activeList = '',
	setActiveList = () => {},
	activeService = '',
	setShowGlobalConfigForm = () => {},
}) {
	const defaultFilters = { activeList, activeService };
	const { data, loading, filters, setFilters } = useListConvenienceRateConfigurations({
		defaultFilters,
	});

	return (
		<div>
			<ListHeader
				filters={filters}
				setFilters={setFilters}
				activeList={activeList}
				setActiveList={setActiveList}
				activeService={activeService}
				setShowGlobalConfigForm={setShowGlobalConfigForm}
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
