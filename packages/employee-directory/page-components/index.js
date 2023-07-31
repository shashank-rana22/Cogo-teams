import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import useGetColumns from '../common/useGetColumns';
import useGetEmployeeList from '../hooks/useGetEmployeeList';
import useGetEmployeeStats from '../hooks/useGetEmployeeStats';

import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';
import Filters from './Filters';
import FixedCard from './FixedCard';
import Header from './Header';
import styles from './styles.module.css';

function EmployeeDirectory() {
	const [bulkActions, setBulkActions] = useState({});
	const [selectedIds, setSelectedIds] = useState([]);
	const [openEmployeeDetails, setOpenEmployeeDetails] = useState(false);
	const [employeeDetails, setEmployeeDetails] = useState({});
	const [searchText, setSearchText] = useState('');
	const [sortType, setSortType] = useState('');

	const { bulkEdit } = bulkActions;

	const {
		filters, setFilters, debounceQuery, data : employeeData,
		loading : detailsLoading, setemployeeFilters, employeeFilters, refetch, getEmployeeList,
	} = useGetEmployeeList();

	const { data, statsRefetch } = useGetEmployeeStats();

	const { list = [], is_hr_admin, total_count } = employeeData || {};

	const handleAllSelect = (e) => {
		const { checked } = e.target;

		if (checked) {
			const ids = list.map((val) => val.id);
			return setSelectedIds(ids);
		}

		return setSelectedIds([]);
	};

	const handleSelectId = (e, id) => {
		const { checked } = e.target;
		if (checked) {
			return setSelectedIds((prev) => ([...prev, id]));
		}
		const filterArr = selectedIds.filter((val) => val !== id);
		return setSelectedIds(filterArr);
	};

	const handleEmployeeId = (dataValues) => {
		setOpenEmployeeDetails(true);
		setEmployeeDetails(dataValues);
	};

	const columns = useGetColumns({
		bulkEdit,
		handleAllSelect,
		handleSelectId,
		selectedIds,
		dataArr: list,
		handleEmployeeId,
	});

	const totalEmployeeCount = useMemo(() => data.total, [data.total]);

	return (
		<>
			<div className={styles.container}>
				<h3 className={styles.heading}>Employee Directory</h3>
				<Header
					data={data}
					activeTab={filters.employee_status}
					setFilters={setFilters}
					setSearchText={setSearchText}
					setSortType={setSortType}
					totalEmployeeCount={total_count}
					employeeFilters={employeeFilters}
					getEmployeeList={getEmployeeList}
					setSelectedIds={setSelectedIds}
				/>
				<Filters
					setFilters={setFilters}
					setBulkActions={setBulkActions}
					setSelectedIds={setSelectedIds}
					debounceQuery={debounceQuery}
					filters={filters}
					totalEmployeeCount={totalEmployeeCount}
					searchText={searchText}
					setSearchText={setSearchText}
					sortType={sortType}
					setSortType={setSortType}
					setemployeeFilters={setemployeeFilters}
					employeeFilters={employeeFilters}
					bulkActions={bulkActions}
				/>
				<EmployeeList
					selectedIds={selectedIds}
					columns={columns}
					data={employeeData}
					setFilters={setFilters}
					setSelectedIds={setSelectedIds}
					loading={detailsLoading}
				/>
			</div>
			{!isEmpty(selectedIds) && (
				<FixedCard
					selectedIds={selectedIds}
					refetch={refetch}
					setBulkActions={setBulkActions}
					statsRefetch={statsRefetch}
					setSelectedIds={setSelectedIds}
				/>
			)}
			{openEmployeeDetails && (
				<EmployeeDetails
					employeeDetails={employeeDetails}
					onClose={() => setOpenEmployeeDetails(false)}
					show={openEmployeeDetails}
					refetch={refetch}
					isHRAdmin={is_hr_admin}
				/>
			)}
		</>
	);
}

export default EmployeeDirectory;
