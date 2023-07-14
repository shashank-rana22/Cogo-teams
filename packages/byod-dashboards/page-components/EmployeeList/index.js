import { Input, Pagination, Tabs, TabPanel } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useGetEmployees from '../../hooks/useGetEmployees';
import { ADMIN_TAB_OPTIONS, HRBP_TAB_OPTIONS } from '../../utils/constant';

import styles from './styles.module.css';
import getColumns from './useGetColumns';

const geo = getGeoConstants();

const DEFAULT_ARRAY_LENGTH = 0;

function EmployeeList() {
	const [searchValue, setSearchValue] = useState('');
	const profile = useSelector((state) => state.profile || {});

	const { auth_role_data } = profile || {};

	const { id : adminId } = auth_role_data;

	const isAdmin = adminId === geo.uuid.hrbp_admin_role_id;

	const { data, loading, setFilters, filters, debounceQuery } = useGetEmployees(isAdmin);

	const columns = getColumns(isAdmin);
	const { list = [], page, page_limit, total_count } = data || {};
	const { status } = filters;

	const handleSearch = (e) => {
		debounceQuery(e);
		setSearchValue(e);
	};

	const TAB_OPTIONS = isAdmin ? ADMIN_TAB_OPTIONS : HRBP_TAB_OPTIONS;

	const handleTabChange = (value) => {
		setFilters((prev) => ({ ...prev, status: value }));
	};

	return (
		<>
			<div className={styles.flex}>
				<div className={styles.title}>
					Employee List
				</div>
				<Input
					size="md"
					placeholder="Search by Name or Email"
					className={styles.search_input}
					prefix={<IcMSearchlight width={20} height={20} />}
					value={searchValue}
					onChange={handleSearch}
				/>
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={status}
					themeType="primary"
					onChange={handleTabChange}
				>
					{TAB_OPTIONS.map((val) => (
						<TabPanel name={val.value} title={val.label} key={val.value} />
					))}
				</Tabs>
			</div>

			{ list.length === DEFAULT_ARRAY_LENGTH
				? (
					<div className={styles.image_container}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipmentEmptyState.png"
							alt="Empty"
							className={styles.no_data_found_img}
						/>
						<div className={styles.error_msg}>No Data Found</div>
					</div>
				) : (
					<>
						<StyledTable columns={columns} data={list} loading={loading} />
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
							/>
						</div>
					</>
				)}
		</>
	);
}

export default EmployeeList;
