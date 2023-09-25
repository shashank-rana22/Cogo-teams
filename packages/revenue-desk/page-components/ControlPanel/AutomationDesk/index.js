import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import LoaderDetails from '../../common/Loader';
import { VALUE_ONE, VALUE_ZERO, VALUE_TEN, SRC } from '../../constants';
import useListAutomationParameter from '../hooks/useListAutomationParameter';

import FilterLayout from './FilterLayout';
import styles from './styles.module.css';
import TableLayout from './TableLayout';

function AutomationDesk() {
	const [filter, setFilter] = useState({ service_type: 'fcl_freight_service' });
	const { data, refetch = () => {}, loading = false, page, setPage } = useListAutomationParameter();

	return (
		<div>
			<FilterLayout filter={filter} setFilter={setFilter} refetch={refetch} />
			{loading && <LoaderDetails />}
			{!loading && (
				<div>
					{data?.list?.length === VALUE_ZERO ? (
						<div className={styles.icon}>
							<img
								src={SRC}
								alt="empty_page"
								height="50%"
								width="50%"
							/>
						</div>
					) : (
						<div>
							{data?.list?.map((val) => (
								<TableLayout
									filter={filter}
									val={val}
									key={val?.id}
									refetch={refetch}
								/>
							))}
						</div>
					)}
				</div>
			)}
			{(data?.total_count || VALUE_ZERO) > VALUE_TEN ? (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						totalItems={data?.total_count || VALUE_ZERO}
						currentPage={page || VALUE_ONE}
						pageSize={data?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default AutomationDesk;
