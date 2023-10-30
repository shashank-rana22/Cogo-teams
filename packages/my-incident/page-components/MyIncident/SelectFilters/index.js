import React from 'react';

import Filters from '../common/Filters';

function SelectFilter({ globalFilters, setGlobalFilters, activeTab }) {
	return (
		<div>

			<Filters onChangeFilters={setGlobalFilters} filters={globalFilters} activeTab={activeTab} />

		</div>
	);
}

export default SelectFilter;
