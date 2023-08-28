import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	const {
		data,
		refetchListFclSearches,
		pagination,
		setPagination,
		loading,
		setFilters,
		sortFilters,
		setSortFilters,
	} = useListFclSearches();

	return (
		<>
			<Header />

			<LocationSelect
				refetchListFclSearches={refetchListFclSearches}
				setFilters={setFilters}
				setPagination={setPagination}
				listLoading={loading}
				sortFilters={sortFilters}
				setSortFilters={setSortFilters}
			/>

			<List
				refetchListFclSearches={refetchListFclSearches}
				data={data}
				pagination={pagination}
				loading={loading}
				setPagination={setPagination}
				setFilters={setFilters}
				setSortFilters={setSortFilters}
			/>
		</>
	);
}

export default SupplyAllocation;
