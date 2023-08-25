import { Input } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import useGetEmployeeList from '../../../hooks/useGetEmployeeList';
import { EMPLOYEE_LIST_CONTROLS } from '../../../utils/constants';

import EmployeeTable from './EmployeeTable';
import styles from './styles.module.css';

function EmployeeList({ selectedLocation }) {
	const { designation } = EMPLOYEE_LIST_CONTROLS;
	console.log('selectedLocation', selectedLocation);
	// const [editItemId, setEditItemId] = useState(null);
	// const [selectedIds, setSelectedIds] = useState([]);
	const { loading, data, setFilters } = useGetEmployeeList(selectedLocation);
	console.log(data);
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.heading}>Assign Employee</span>
				<div className={styles.selected}>
					<span className={styles.num_selected}>Selected:</span>
					<span className={styles.num_show}>20 Employees</span>
				</div>

			</div>
			<div className={styles.emplist_header}>
				<span className={styles.emp_heading}>Employee List</span>
				<div className={styles.filters}>
					<div className={styles.selection_options}>
						<div className={styles.select}>
							<AsyncSelect {...designation} />
						</div>

						{/* <div className={styles.select}>
							<AsyncSelect {...location} />
						</div> */}
					</div>
					<Input
						size="md"
						prefix={<IcMSearchdark />}
						placeholder="Search"
					/>
				</div>
			</div>
			<div className={styles.container}>
				<EmployeeTable
					data={data}
					setFilters={setFilters}
					loading={loading}
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
