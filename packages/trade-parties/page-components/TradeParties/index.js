import { useState } from 'react';

import Filter from './Filter';
import ListView from './ListView';

const DEFAULT_PAGE = 1;

function TradeParties() {
	const [globalSearch, setGlobalSearch] = useState('');
	const [typeOfSearch, setTypeOfSearch] = useState('trade_party');
	const [filterParams, setFilterParams] = useState({
		serial_id           : '',
		registration_number : '',
		country_id          : '',
		company_type        : '',
	});
	const [page, setPage] = useState(DEFAULT_PAGE);

	return (
		<div>
			<Filter
				typeOfSearch={typeOfSearch}
				setTypeOfSearch={(value) => setTypeOfSearch(value)}
				globalSearch={globalSearch}
				setGlobalSearch={(value) => setGlobalSearch(value)}
				filterParams={filterParams}
				setFilterParams={(value) => setFilterParams(value)}
				setPage={(p) => setPage(p)}
			/>

			<ListView
				page={page}
				typeOfSearch={typeOfSearch}
				globalSearch={globalSearch}
				filterParams={filterParams}
				setPage={(val) => setPage(val)}
			/>

		</div>
	);
}

export default TradeParties;
