import { useState } from 'react';

import Filter from './Filter/index';
import ListView from './ListView/index';
import PageNumber from './PageNumber/index';

const DEFAULT_PAGE = 1;

function TradeParties() {
	const [globalSearch, setGlobalSearch] = useState('');
	const [typeOfSearch, setTypeOfSearch] = useState('sage_organization_id');
	const [filterParams, setFilterParams] = useState({
		serial_id           : '',
		registration_number : '',
		country_id          : '',
		company_type        : '',
	});
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [totalCount, setTotalCount] = useState(DEFAULT_PAGE);
	const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
	const [pageLimit, setPageLimit] = useState(DEFAULT_PAGE);

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
			<PageNumber
				page={page}
				setPage={(value) => setPage(value)}
				totalCount={totalCount}
				totalPages={totalPages}
				pageLimit={pageLimit}
			/>
			<ListView
				page={page}
				typeOfSearch={typeOfSearch}
				globalSearch={globalSearch}
				filterParams={filterParams}
				setTotalCount={(count) => setTotalCount(count)}
				setTotalPages={(pages) => setTotalPages(pages)}
				setPageLimit={(limit) => setPageLimit(limit)}
			/>

			<PageNumber
				page={page}
				setPage={(value) => setPage(value)}
				totalCount={totalCount}
				totalPages={totalPages}
			/>

		</div>

	);
}

export default TradeParties;
