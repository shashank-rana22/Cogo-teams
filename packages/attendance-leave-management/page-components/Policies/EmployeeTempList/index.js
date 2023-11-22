import { Button, Input, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetListGeoLocationReq from '../../../hooks/useGetListGeoLocationReq';

import EmployeeTempTable from './EmployeeTempTable';
import GiveAccess from './GiveAccess';
import styles from './styles.module.css';

function EmployeeTempList() {
	const [searchQuery, setSearchQuery] = useState('');
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const {
		loading,
		data,
		setFilters, filters,
		getListGeoLocationReq,
		debounceQuery,
	} = useGetListGeoLocationReq();

	const { list, page, page_limit, total_count } = data || {};

	const handleSearch = (val) => {
		debounceQuery(val);
		setFilters((prev) => ({ ...prev, search: val, page: 1 }));
		setSearchQuery(val);
	};

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.heading}>Assign Employee</span>
			</div>
			<div className={styles.emplist_header}>
				<span className={styles.emp_heading}>Employee List</span>
				<div className={styles.filters}>
					<Input
						size="md"
						prefix={<IcMSearchlight />}
						placeholder="Search"
						onChange={(e) => handleSearch(e)}
						value={searchQuery}
					/>
					<Button size="md" themeType="primary" onClick={() => setOpenLeaveModal(true)}>
						Give Access
					</Button>
					{ openLeaveModal && (
						<GiveAccess
							show={openLeaveModal}
							onClose={() => setOpenLeaveModal(false)}
							list={list}
							getListGeoLocationReq={getListGeoLocationReq}
						/>
					) }
				</div>
			</div>
			<EmployeeTempTable
				data={list}
				setFilters={setFilters}
				loading={loading}
				filters={filters}
				getListGeoLocationReq={getListGeoLocationReq}
			/>
			<Pagination
				className="md"
				totalItems={total_count}
				type="table"
				currentPage={page}
				pageSize={page_limit}
				onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
			/>
		</div>
	);
}

export default EmployeeTempList;
