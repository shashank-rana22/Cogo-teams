import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateSupplySearch from '../../hooks/useCreateSupplySearch';
import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	const [locationDetails, setLocationDetails] = useState({});

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

	const { control, reset } = useForm({});

	const { createSupplySearch, createSearchLoadng } = useCreateSupplySearch({
		refetchListFclSearches,
		reset,
		setLocationDetails,
	});

	return (
		<>
			<Header />

			<LocationSelect
				control={control}
				createSupplySearch={createSupplySearch}
				refetchListFclSearches={refetchListFclSearches}
				locationDetails={locationDetails}
				setLocationDetails={setLocationDetails}
				setFilters={setFilters}
				setPagination={setPagination}
				listLoading={loading}
				createSearchLoadng={createSearchLoadng}
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
