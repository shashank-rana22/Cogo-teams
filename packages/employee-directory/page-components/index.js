import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetColumns from '../common/useGetColumns';
import useGetEmployeeList from '../hooks/useGetEmployeeList';

import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';
import Filters from './Filters';
import FixedCard from './FixedCard';
import Header from './Header';
import styles from './styles.module.css';

const randomDataArray = [
	{
		id                : 1,
		employee_name     : 'Aanchal Kapoor',
		cogo_id           : 'COGO-0001',
		designation       : 'Product Designer',
		contact_no        : '1234567890',
		email_id          : 'test@test.com',
		chapter           : 'product',
		location          : 'Gurgaon',
		reporting_manager : 'Vinod Talapa',
		status            : 'active',
	},
	{
		id                : 2,
		employee_name     : 'John Doe',
		cogo_id           : 'COGO-1234',
		designation       : 'Software Engineer',
		contact_no        : '9876543210',
		email_id          : 'john.doe@example.com',
		chapter           : 'development',
		location          : 'New York',
		reporting_manager : 'Alice Johnson',
		status            : 'active',
	},
	{
		id                : 3,
		employee_name     : 'Jane Smith',
		cogo_id           : 'COGO-5678',
		designation       : 'Marketing Manager',
		contact_no        : '1234509876',
		email_id          : 'jane.smith@example.com',
		chapter           : 'marketing',
		location          : 'London',
		reporting_manager : 'Michael Brown',
		status            : 'active',
	},
	{
		id                : 4,
		employee_name     : 'Robert Johnson',
		cogo_id           : 'COGO-9123',
		designation       : 'HR Specialist',
		contact_no        : '9876123450',
		email_id          : 'robert.johnson@example.com',
		chapter           : 'human_resources',
		location          : 'Berlin',
		reporting_manager : 'Emma Davis',
		status            : 'active',
	},
	{
		id                : 5,
		employee_name     : 'Emily Williams',
		cogo_id           : 'COGO-4567',
		designation       : 'Data Analyst',
		contact_no        : '7890654321',
		email_id          : 'emily.williams@example.com',
		chapter           : 'analytics',
		location          : 'San Francisco',
		reporting_manager : 'David Lee',
		status            : 'active',
	},
	{
		id                : 6,
		employee_name     : 'Michael Anderson',
		cogo_id           : 'COGO-8912',
		designation       : 'Finance Manager',
		contact_no        : '9012345678',
		email_id          : 'michael.anderson@example.com',
		chapter           : 'finance',
		location          : 'Singapore',
		reporting_manager : 'Sophia Wilson',
		status            : 'active',
	},
	{
		id                : 7,
		employee_name     : 'Olivia Martinez',
		cogo_id           : 'COGO-3456',
		designation       : 'Product Manager',
		contact_no        : '5678901234',
		email_id          : 'olivia.martinez@example.com',
		chapter           : 'product',
		location          : 'Tokyo',
		reporting_manager : 'William Garcia',
		status            : 'active',
	},
	{
		id                : 8,
		employee_name     : 'James Robinson',
		cogo_id           : 'COGO-7890',
		designation       : 'Sales Representative',
		contact_no        : '3456789012',
		email_id          : 'james.robinson@example.com',
		chapter           : 'sales',
		location          : 'Sydney',
		reporting_manager : 'Ava Taylor',
		status            : 'active',
	},
	{
		id                : 9,
		employee_name     : 'Sophia Harris',
		cogo_id           : 'COGO-2345',
		designation       : 'Quality Assurance Specialist',
		contact_no        : '8901234567',
		email_id          : 'sophia.harris@example.com',
		chapter           : 'quality_assurance',
		location          : 'Toronto',
		reporting_manager : 'Ethan Phillips',
		status            : 'active',
	},
	{
		id                : 10,
		employee_name     : 'Noah King',
		cogo_id           : 'COGO-6789',
		designation       : 'Graphic Designer',
		contact_no        : '2345678901',
		email_id          : 'noah.king@example.com',
		chapter           : 'design',
		location          : 'Paris',
		reporting_manager : 'Isabella Lewis',
		status            : 'active',
	},
];

function EmployeeDirectory() {
	const [bulkActions, setBlukActions] = useState({});
	const [selectedIds, setSelectedIds] = useState([]);
	const [openEmployeeDetails, setOpenEmployeeDetails] = useState(false);
	const [employeeDetails, setEmployeeDetails] = useState({});

	const { bulkEdit } = bulkActions;

	const handleAllSelect = (e) => {
		const { checked } = e.target;

		if (checked) {
			const ids = randomDataArray.map((val) => val.id);
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
		dataArr: randomDataArray,
		handleEmployeeId,
	});

	const { filters, setFilters, debounceQuery } = useGetEmployeeList();

	return (
		<>
			<div className={styles.container}>
				<h3 className={styles.heading}>Employee Directory</h3>
				<Header activeTab={filters.activeTab} setActiveTab={setFilters} />
				<Filters
					setFilters={setFilters}
					setBlukActions={setBlukActions}
					setSelectedIds={setSelectedIds}
					debounceQuery={debounceQuery}
				/>
				<EmployeeList
					selectedIds={selectedIds}
					columns={columns}
					randomDataArray={randomDataArray}
					setFilters={setFilters}
					setSelectedIds={setSelectedIds}
				/>
			</div>
			{!isEmpty(selectedIds) && <FixedCard selectedIds={selectedIds} />}
			{openEmployeeDetails && employeeDetails && <EmployeeDetails />}
		</>
	);
}

export default EmployeeDirectory;
