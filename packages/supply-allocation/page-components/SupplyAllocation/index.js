import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateSupplySearch from '../../hooks/useCreateSupplySearch';
import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	const [locationDetails, setLocationDetails] = useState({});
	const [filters, setFilters] = useState({});

	const { data, refetchListFclSearches } = useListFclSearches({ filters });

	const { control, reset } = useForm({});

	const { createSupplySearch } = useCreateSupplySearch({ refetchListFclSearches, reset, setLocationDetails });

	// if (loading) {
	// 	return null;
	// }

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
			/>

			<List data={data} />

		</>
	);
}

export default SupplyAllocation;
