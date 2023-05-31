import { useState } from 'react';

import Filter from './components/Filter';
import RateCoverageDetails from './components/RateCoverageDetails';
import Stats from './components/Stats';
import useGetStats from './hooks/useGetStats';

const defaultFilterData = {
	service                : 'fcl_freight',
	origin_country_id      : undefined,
	destination_country_id : undefined,
	commodity              : undefined,
	container_type         : undefined,
	container_size         : undefined,
};

function RateCoverageContent() {
	const [filter, setFilter] = useState(defaultFilterData);
	const { loading, data, getStats } = useGetStats(filter.service || 'lcl_freight');

	return (
		<div>
			<Filter getStats={getStats} filter={filter} setFilter={setFilter} defaultFilterData={defaultFilterData} />
			<Stats data={data} />
			<RateCoverageDetails data={data} loading={loading} filter={filter} />
		</div>
	);
}
export default RateCoverageContent;
