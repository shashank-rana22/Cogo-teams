import { Table, Pagination, Select, DateRangepicker } from '@cogoport/components';
import {
	AsyncSelect,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetListTransactions from '../../../hooks/useGetListTransactions';
import { SELECTCONFIGURATIONSTRANSACTION, STATUS_OPTIONS } from '../../../utils/constants';
import EmptyState from '../commons/EmptyState';

import getColumns from './getColumns';
import styles from './styles.module.css';

const EMPTYTEXT = 'No Data Found';

function Transactions() {
	const { data, filters, setFilters, loading } = useGetListTransactions();
	const { list, page, total_count, page_limit } = data || {};

	const [date, setDate] = useState(null);
	const handlePagination = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const columns = getColumns();

	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>
				<div className={styles.top_text_container}>
					<span className={styles.top_bold_text}>ALL TRANSACTIONS</span>
					<span className={styles.top_grey_text}>A ledger of all the transactions you’ve made</span>
				</div>
				<div className={styles.header_input}>

					<div className={styles.input_filters}>
						{SELECTCONFIGURATIONSTRANSACTION.map((config) => (
							<AsyncSelect
								key={config.name}
								initialCall
								isClearable
								className={styles.select_input}
								asyncKey={config.asyncKey}
								name={config.name}
								placeholder={config.placeholder}
								params={{
									filters: {
										status: 'active',
									},
								}}
								value={filters[config.name]}
								onChange={(val) => setFilters((prev) => ({ ...prev, [config.name]: val, page: 1 }))}
							/>

						))}

						<Select
							className={styles.select_input}
							isClearable
							size="md"
							name="status"
							placeholder="Status"
							options={STATUS_OPTIONS}
							value={filters.status}
							onChange={(val) => {
								setFilters((prev) => ({ ...prev, status: val, page: 1 }));
							}}
						/>

						<DateRangepicker
							name="date_range"
							className={styles.select_input}
							isPreviousDaysAllowed
							isClearable
							value={date}
							onChange={(val) => {
								setDate(val);
								setFilters(
									(prev) => ({ ...prev, from_date: val.startDate, to_date: val.endDate, page: 1 }),
								);
							}}
						/>
					</div>

				</div>
				{
				!isEmpty(list) || loading
					? (
						<div className={styles.container}>
							<Table columns={columns} data={list || []} loading={loading} />
						</div>

					)
					:			 (
						<div style={{ paddingTop: 6, paddingLeft: 6 }}>
							<EmptyState emptyText={EMPTYTEXT} />
						</div>
					)
			}
				<Pagination
					type="table"
					currentPage={page}
					onPageChange={handlePagination}
					totalItems={total_count}
					pageSize={page_limit}
					className={styles.pagination_container}
				/>
			</div>

		</div>

	);
}

export default Transactions;
