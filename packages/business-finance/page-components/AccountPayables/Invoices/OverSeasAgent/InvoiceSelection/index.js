import React from 'react';

import List from '../../../../commons/List/index.tsx';
import { CREATE_PAYRUN_CONFIG } from '../../CreatePayrun/Configurations/createPayrunConfig';

import FilterContainers from './FilterContainers';

function InvoiceSelction() {
	return (
		<div>
			<FilterContainers />

			<List
    // itemData={apiData}
    // loading={billsLoading}
				config={CREATE_PAYRUN_CONFIG}
    // functions={FUNCTIONS}
    // sort={orderBy}
    // setSort={setOrderBy}
    // page={filters?.pageIndex || FIRST_PAGE}
    // pageSize={10}
    // handlePageChange={(val) => setFilters({
    // 	...filters,
    // 	pageIndex: val,
    // })}
    // renderHeaderCheckbox={getTableHeaderCheckbox}
				rowStyle="border"
				showPagination
				paginationType="number"
			/>
		</div>
	);
}

export default InvoiceSelction;
