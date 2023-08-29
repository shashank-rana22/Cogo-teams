import { Input } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetEmployeeList from '../../../hooks/useGetEmployeeList';
import { EMPLOYEE_LIST_CONTROLS } from '../../../utils/constants';

import EmployeeTable from './EmployeeTable';
import styles from './styles.module.css';

function EmployeeList({ selectedLocation }) {
	const [searchQuery, setSearchQuery] = useState('');
	const { designation } = EMPLOYEE_LIST_CONTROLS;
	console.log('selectedLocation', selectedLocation);
	// const [editItemId, setEditItemId] = useState(null);
	// const [selectedIds, setSelectedIds] = useState([]);
	const { loading, data, setFilters, filters, debounceQuery, refetch } = useGetEmployeeList(selectedLocation);
	console.log(data);

	const handleSearch = (val) => {
		debounceQuery(val);
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
					<div className={styles.selection_options}>
						<div className={styles.select}>
							<AsyncSelect
								{...designation}
								onChange={(e) => setFilters((prev) => ({ ...prev, designation: e }))}
								value={filters.designation}
							/>
						</div>

						{/* <div className={styles.select}>
							<AsyncSelect {...location} />
						</div> */}
					</div>
					<Input
						size="md"
						prefix={<IcMSearchdark />}
						placeholder="Search"
						onChange={(e) => handleSearch(e)}
						value={searchQuery}
					/>
				</div>
			</div>
			<div className={styles.container}>
				<EmployeeTable
					data={data}
					setFilters={setFilters}
					loading={loading}
					filters={filters}
					searchQuery={searchQuery}
					selectedLocation={selectedLocation}
					refetch={refetch}
					// editItemId={editItemId}
					// setEditItemId={setEditItemId}
					// selectedIds={selectedIds}
					// setSelectedIds={setSelectedIds}
				/>
			</div>
		</div>
	);
}

export default EmployeeList;
