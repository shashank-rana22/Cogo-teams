import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import FilterStats from './FilterStats';

function Filters({
	filters,
	setFilters,
}) {
	return (
		<>
			<div>Filters</div>
			<Input
				className="primary md"
				value={filters?.searchParameter}
				placeholder="Search..."
				suffix={<IcMSearchlight style={{ fontSize: '1rem' }} />}
				onChange={(e) => {
					setFilters({ ...filters, searchParameter: e.target.value });
				}}
			/>
			<FilterStats />
		</>
	);
}

export default Filters;
