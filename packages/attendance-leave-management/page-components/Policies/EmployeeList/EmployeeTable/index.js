import { Select, Pill, Pagination, Checkbox, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../../common/StyledTable';

import styles from './styles.module.css';

function EmployeeTable() {
	const [data, setData] = useState([
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 1,
		},
		{
			name             : 'Akshay',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 2,

		},
		{
			name             : 'Akshay',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 3,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 4,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 5,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 6,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 7,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 8,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 8,

		},
		{
			name             : 'Hritik',
			designation      : 'SDE',
			department       : 'Tech',
			reporting_office : 'Mumbai',
			access_status    : 'Active',
			allowed_offices  : 'Mumbai',
			id               : 8,

		},
	]);
	const [editItemId, setEditItemId] = useState(null);
	const [selectedIds, setSelectedIds] = useState([]);
	// const toggleStatus = (itemId) => {
	// 	setData((prevData) => prevData.map((item) => (item.id === itemId
	// 		? { ...item, access_status: item.access_status === 'Active' ? 'Inactive' : 'Active' }
	// 		: item)));
	// };
	const handleEditClick = (itemId) => {
		setEditItemId(itemId);
	};

	const handleStatusChange = (newStatus) => {
		setData((prevData) => prevData.map((item) => (item.id === editItemId
			? { ...item, access_status: newStatus } : item)));
		setEditItemId(null);
	};

	const handleAllSelect = (e) => {
		const { checked } = e.target;

		if (checked) {
			const ids = data.map((val) => val.id);
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

	const NUM = 1;
	const [currentPage, setCurrentPage] = useState(NUM);
	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const options = [
		{ label: 'Active', value: 'Active' },
		{ label: 'Inactive', value: 'Inactive' }];
	const columns = [
		{
			Header: <Checkbox
				checked={data.length === selectedIds.length}
				onChange={(e) => handleAllSelect(e)}
			/>,
			accessor: (item) => (
				<Checkbox
					checked={selectedIds.includes(item.id)}
					onChange={(e) => handleSelectId(e, item.id)}
				/>
			),
			id: 'select_all',
		},
		{ Header: 'NAME', accessor: 'name' },
		{ Header: 'DESIGNATION', accessor: 'designation' },
		{ Header: 'DEPARTMENT', accessor: 'department' },
		{ Header: 'REPORTING OFFICE', accessor: 'reporting_office' },
		{
			Header   : 'ACCESS STATUS',
			accessor : (item) => (
				<div>
					{editItemId === item.id ? (
						<div className={styles.editContainer}>
							<Select
								size="sm"
								value={item.access_status}
								onChange={(e) => handleStatusChange(e)}
								options={options}
							/>
						</div>
					) : (
						<div className={styles.pill}>
							<Pill size="lg" color={item.access_status === 'Active' ? '#c4dc91' : 'red'}>
								{item.access_status}
							</Pill>
							<IcMEdit onClick={() => handleEditClick(item.id)} />
						</div>
					)}
				</div>
			),
		},
		{
			Header   : 'ALLOWED OFFICES',
			accessor : (item) => (
				<div className={styles.select}>
					<Select
						size="sm"
						placeholder={item.allowed_offices}
					/>
				</div>
			),
		},
	];
	const ITEMSPERPAGE = 5;
	const CHECKSIZE = 0;
	const startIndex = (currentPage - NUM) * ITEMSPERPAGE;
	const endIndex = startIndex + ITEMSPERPAGE;
	const displayedData = data.slice(startIndex, endIndex);
	return (
		<>
			<StyledTable columns={columns} data={displayedData} />
			{selectedIds.length !== CHECKSIZE ? (
				<div className={styles.footer}>
					<div>
						<span className={styles.footer_text}>
							{selectedIds.length === data.length
								? `All ${selectedIds.length} employee are selected.`
								: `${selectedIds.length} employees are selected on this page.`}
						</span>

					</div>
					<Button size="md" themeType="primary">Make Changes</Button>
				</div>
			)
				: (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={currentPage}
							totalItems={data.length}
							pageSize={ITEMSPERPAGE}
							onPageChange={onPageChange}
						/>
					</div>
				)}
		</>
	);
}

export default EmployeeTable;
