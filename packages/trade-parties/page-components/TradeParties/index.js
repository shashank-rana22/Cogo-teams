import { useState } from 'react';

import Filter from './Filter';
import ListView from './ListView';

function TradeParties() {
	const [globalSearch, setGlobalSearch] = useState('');
	const [typeOfSearch, setTypeOfSearch] = useState('trade_party');
	const [filterParams, setFilterParams] = useState({
		registration_number : '',
		country_id          : '',
		company_type        : '',
		page                : 1,
	});

	return (
		<div>
			<Filter
				typeOfSearch={typeOfSearch}
				setTypeOfSearch={setTypeOfSearch}
				globalSearch={globalSearch}
				setGlobalSearch={setGlobalSearch}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
			/>

			<ListView
				typeOfSearch={typeOfSearch}
				globalSearch={globalSearch}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
			/>
		</div>
	);
}

export default TradeParties;
