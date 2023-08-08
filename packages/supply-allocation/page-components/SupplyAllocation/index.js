import { useForm } from '@cogoport/forms';

import useCreateSupplySearch from '../../hooks/useCreateSupplySearch';
import useListFclSearches from '../../hooks/useListFclSearches';

import Header from './Header';
import List from './List';
import LocationSelect from './LocationSelect';

function SupplyAllocation() {
	const { data, loading } = useListFclSearches();
	const { control, watch } = useForm({});
	console.log('watch:', watch());

	console.log('data:', data);
	const { createSupplySearch } = useCreateSupplySearch();

	if (loading) { return null; }
	return (
		<>
			<Header />
			<LocationSelect control={control} createSupplySearch={createSupplySearch} />
			<List source="add" data={data} />

		</>
	);
}

export default SupplyAllocation;
