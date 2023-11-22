import { Input, Pagination, Table, Select } from '@cogoport/components';
import {
	AsyncSelect,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetListEmployeeSalaryDetails from '../../../../hooks/useGetListEmployeeSalaryDetails';
import { selectConfigurationsPeoplePage } from '../../../../utils/constants';
import EmptyState from '../../commons/EmptyState';
import getColumns from '../Columns';

import styles from './styles.module.css';

const EMPTYTEXT = 'No Data Found';

const STATUS_OPTIONS = [{ label: 'Active', value: 'false' }, { label: 'On Hold', value: 'true' }];
function TableComponent({ router }) {
	const { data, filters, setFilters, debounceQuery, loading } = useGetListEmployeeSalaryDetails();
	const { list, page, total_count, page_limit } = data || {};
	const [search, setSearch] = useState('');

	const columns = getColumns({ router });

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};
	return (
		< >
			<div className={styles.header_input}>
				<div className={styles.input_filters}>
					{selectConfigurationsPeoplePage.map((config) => (
						<AsyncSelect
							key={config.name}
							initialCall
							className={styles.select_input}
							asyncKey={config.asyncKey}
							name={config.name}
							placeholder={config.placeholder}
							params={config.params}
							isClearable
							labelKey={config.labelKey}
							valueKey={config.valueKey}
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
						value={filters.salary_on_hold}
						onChange={(val) => {
							setFilters((prev) => ({ ...prev, salary_on_hold: val, page: 1 }));
						}}
					/>
				</div>
				<div>
					<Input
						size="md"
						// control={control}
						// name="search_query"
						value={search}
						onChange={(value) => {
							setSearch(value);
							debounceQuery(value);
							setFilters((prev) => ({ ...prev, page: 1 }));
						}}
						className={styles.input_search}
						placeholder="Search"
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
				totalItems={total_count}
				pageSize={page_limit}
				className={styles.pagination_container}
				onPageChange={onPageChange}
			/>
		</>
	);
}
export default TableComponent;
