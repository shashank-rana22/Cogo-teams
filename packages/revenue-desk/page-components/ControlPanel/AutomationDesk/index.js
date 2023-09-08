import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import useListAutomationParameter from '../hooks/useListAutomationParameter';

import FilterLayout from './FilterLayout';
import TableLayout from './TableLayout';

function AutomationDesk() {
	const ZERO_VALUE = 0;
	const ONE_VALUE = 1;
	const TEN_VALUE = 10;
	const [filter, setFilter] = useState({ service_type: 'fcl_freight_service' });
	const { data, refetch = () => {}, loading, page, setPage } = useListAutomationParameter();

	return (
		<div>
			<FilterLayout filter={filter} setFilter={setFilter} refetch={refetch} />
			{data?.list?.map((val) => (
				<TableLayout
					filter={filter}
					val={val}
					key={val?.id}
					refetch={refetch}
					loading={loading}
				/>
			))}
			{(data?.total_count || ZERO_VALUE) > TEN_VALUE ? (
				<div style={{ float: 'right', marginTop: '15px' }}>
					<Pagination
						type="table"
						totalItems={data?.total_count || ZERO_VALUE}
						currentPage={page || ONE_VALUE}
						pageSize={data?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default AutomationDesk;
