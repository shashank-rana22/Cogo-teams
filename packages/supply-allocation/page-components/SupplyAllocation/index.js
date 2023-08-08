import { useForm } from '@cogoport/forms';

import useCreateSupplySearch from '../../hooks/useCreateSupplySearch';
import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	const { data, loading, refetchListFclSearches } = useListFclSearches();
	const { control } = useForm({});

	const { createSupplySearch } = useCreateSupplySearch({ refetchListFclSearches });

	if (loading) {
		return null;
	}

	return (
		<>
			<Header />

			<LocationSelect
				control={control}
				createSupplySearch={createSupplySearch}
				refetchListFclSearches={refetchListFclSearches}
			/>

			<List source="add" data={data} />

		</>
	);
}

export default SupplyAllocation;
